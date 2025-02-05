import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import cookiesParser from "cookie-parser"
import session from "express-session"
import { handler as astroHandler } from "./dist/server/entry.mjs";
import { initTable, User } from "./src/db/db.js";
import * as crypto from "crypto"

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
    publicKeyEncoding: { type: "spki", format: "pem"},
    privateKeyEncoding: { type: "pkcs8", format: "pem"}
})

app.use(base, express.static("dist/client/"));
app.use(astroHandler);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookiesParser());
app.use(session({
    secret: sessionEnv,
    resave: false,
    saveUninitialized: true
}))

initTable()

app.post("/signIn/post", async (req, res) => {
    const data = req.body;
    bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
            data.password = hash
            try {
                const insert = await User.create(data)
                res.redirect("/")
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
    bcrypt.compare(data.password, auth.password, (err, result) => {
        if (result) {
            jwt.sign({ user:auth.username }, privateKey,{ algorithm: 'RS256'}, (err, token) => {
                req.session.role = "user"
                req.session.jwt = token  
            })
            res.redirect(`/UserSpace/${auth.id}`)
        } else {
            res.send("Acces denided")
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});