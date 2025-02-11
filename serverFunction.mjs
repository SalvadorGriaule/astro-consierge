import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import session from "express-session"
import { sendConfirm } from "./src/db/mailSender.js"

const saltRound = 10;

export const postCreate = (body,Model,rolename,path) => {
    const data = body;
    bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
            data.password = hash;
            try {
                const insert = await Model.create(data)
                sendConfirm(data.email)
                jwt.sign({ user: insert.id , role:rolename}, rsaKey.privateKey, { algorithm: 'RS256' }, (err, token) => {
                    req.session.role = rolename
                    req.session.jwt = token
                    req.session.save(() => {
                        console.log(req.session.id);
                    })
                })
                res.redirect(`/${path}/${insert.id}`)
            } catch (e) {
                res.send("acces denid")
            }
        })
    }) 
}