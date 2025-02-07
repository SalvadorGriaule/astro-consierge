import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import cookiesParser from "cookie-parser"
import session from "express-session"
import SequelizeStore from "connect-session-sequelize"
import { handler as astroHandler } from "./dist/server/entry.mjs";
import { initTable, User, EmailStandBy , db } from "./src/db/db.js";
import { sendConfirm } from "./src/db/mailSender.js"
import * as crypto from "crypto"

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

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
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

app.post("/signIn/post", async (req, res) => {
    const data = req.body;
    bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
            data.password = hash;
            
            try {
                const insert = await User.create(data)
                sendConfirm(data.email)
                jwt.sign({ user: insert.id }, privateKey, { algorithm: 'RS256' }, (err, token) => {
                    req.session.role = "user"
                    req.session.jwt = token
                    req.session.save(() => {
                        console.log(req.session.id);
                    })
                })
                console.log(insert);
                res.redirect(`/${insert.id}`)
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
                jwt.sign({ user: auth.id }, privateKey, { algorithm: 'RS256' }, (err, token) => {
                    req.session.role = "user"
                    req.session.jwt = token
                    req.session.save(() => {
                        console.log(req.session.id);
                    })
                })
                res.redirect(`/user/${auth.id}`)
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
    const ifExist = await EmailStandBy.findOne({ where: { key: email.email }})
    if(ifExist){
        await EmailStandBy.destroy({ where: { id : ifExist.id }})
        const confirm = await User.findOne({ where: { email: ifExist.email } })
        if (confirm) {
            await User.update({ emailConfirm: true }, { where: { email: email.email } })
            jwt.sign({ user: confirm.id }, privateKey, { algorithm: 'RS256' }, (err, token) => {
                req.session.role = "user"
                req.session.jwt = token
                req.session.save(() => {
                    console.log(req.session.id);
                })
            })
            res.redirect(`/user/${confirm.id}`)
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});