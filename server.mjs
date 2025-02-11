import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import cookiesParser from "cookie-parser"
import session from "express-session"
import SequelizeStore from "connect-session-sequelize"
import * as crypto from "crypto"
import { handler as astroHandler } from "./dist/server/entry.mjs";
import { initTable, User, EmailStandBy, ResetPassword, db, Admin } from "./src/db/db.js";
import { sendConfirm, sendReset } from "./src/db/mailSender.js"
import { seedAdmin , allUser} from "./src/db/admin.js"

const SequelizeSessionStore = SequelizeStore(session.Store)
// express const
const app = express();
const PORT = 3000;
const base = '/'
// bcrypt const
const saltRound = 10;
// key const
dotenv.config();
const sessionEnv = process.env.SESSION_KEY

globalThis.rsaKey = { publicKey:"" , privateKey:""}

rsaKey = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
})

export const sessionStore = new SequelizeSessionStore({
    db: db
})

app.use(base, express.static("dist/client/"));
app.use(astroHandler);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookiesParser());
app.use(session({
    secret: sessionEnv,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))

sessionStore.sync()
initTable()
seedAdmin()

app.post("/signIn/post", async (req, res) => {
    const data = req.body;
    bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
            data.password = hash;

            try {
                const insert = await User.create(data)
                sendConfirm(data.email)
                jwt.sign({ user: insert.id }, rsaKey.privateKey, { algorithm: 'RS256' }, (err, token) => {
                    req.session.role = "user"
                    req.session.jwt = token
                    req.session.save(() => {
                        console.log(req.session.id);
                    })
                })
                console.log(insert);
                res.redirect(`/user/${insert.id}`)
            } catch (e) {
                console.log(e)
                res.send("acces denid")
            }
        })
    })
})

app.post("/login/post", async (req, res) => {
    const data = req.body;
    const auth = await User.findOne({ where: { email: data.email } });
    if (auth) {
        bcrypt.compare(data.password, auth.password, (err, result) => {
            if (result) {
                jwt.sign({ user: auth.id }, rsaKey.privateKey, { algorithm: 'RS256' }, (err, token) => {
                    req.session.role = "user"
                    req.session.jwt = token
                    req.session.save(() => {
                        console.log(req.session.id);
                        res.redirect(`/user/${auth.id}`)
                    })
                })
            } else {
                res.send("Acces denided")
            }
        })
    } else {
        res.send("Email not found")
    }
})

app.get("/session/:id", async (req, res) => {
    const id = req.params;
    const data = sessionStore.get(id.id, (err, session) => {
        if (!err) {
            res.send(session)
        } else {
            res.send({ error: "lien invalide" })
        }
    })
})

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    })
})

app.get("/mailConfirmation/:email", async (req, res) => {
    const email = req.params;
    const ifExist = await EmailStandBy.findOne({ where: { key: email.email } })
    if (ifExist) {
        await EmailStandBy.destroy({ where: { id: ifExist.id } })
        const confirm = await User.findOne({ where: { email: ifExist.email } })
        if (confirm) {
            await User.update({ emailConfirm: true }, { where: { email: email.email } })
            jwt.sign({ user: confirm.id }, rsaKey.privateKey, { algorithm: 'RS256' }, (err, token) => {
                req.session.role = "user"
                req.session.jwt = token
                req.session.save(() => {
                    console.log(req.session.id);
                    res.redirect(`/user/${confirm.id}`)
                })
            })
        }
    }
})

app.post("/resetPassword/post", async (req, res) => {
    const data = req.body;
    const target = await User.findOne({ where: { email: data.email } })
    if (target) {
        sendReset(data.email)
    }
    res.redirect("/login")
})

app.get("/resetPassword/confirm/:email", async (req, res) => {
    const param = req.params;
    const ifExist = await ResetPassword.findOne({ where: { key: param.email } });
    if (ifExist) {
        const target = await User.findOne({ where: { email: ifExist.email } })
        await ResetPassword.destroy({ where: { id: ifExist.id } })
        jwt.sign({ user: target.id }, rsaKey.privateKey, { algorithm: 'RS256' }, (err, token) => {
            req.session.role = "user"
            req.session.jwt = token
            req.session.save(() => {
                console.log(req.session.id);
                res.redirect(`/user/${target.id}/confirmPassword`)
            })
        })
    }
})

app.post("/passwordConfirm/post", async (req, res) => {
    const data = req.body
    const id = jwt.verify(req.session.jwt, rsaKey.privateKey, (err, decoded) => {
        console.log(decoded);
        if (!err) {
            bcrypt.hash(data.password, saltRound, async (err, hash) => {
                try {
                    const target = await User.update({ password: hash }, { where: { id: decoded.user } })
                    res.redirect(`/user/${decoded.user}`);
                } catch (e) {
                    console.log(e);
                    res.redirect("/")
                }
            })
        }
    });
})

app.post("/admin/post", async (req, res) => {
    const data = req.body;
    const auth = await Admin.findOne({ where: { email: data.email } });
    if (auth) {
        bcrypt.compare(data.password, auth.password, (err, result) => {
            if (result) {
                jwt.sign({ user: auth.id , role: "admin" }, rsaKey.privateKey, { algorithm: 'RS256' }, (err, token) => {
                    req.session.role = "admin"
                    req.session.jwt = token
                    req.session.save(() => {
                        console.log(req.session.id);
                        res.redirect(`/Admin/dashboard`)
                    })
                })
            } else {
                res.send("Acces denided")
            }
        })
    } else {
        res.send("Email not found")
    }
})



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});