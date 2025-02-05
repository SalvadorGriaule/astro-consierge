import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import { handler as astroHandler } from "./dist/server/entry.mjs";
import { initTable, User } from "./src/db/db.js";

// express const
const app = express();
const PORT = 3000;
const base = '/'
// bcrypt const
const saltRound = 10;

app.use(base, express.static("dist/client/"));
app.use(astroHandler);
app.use(bodyParser.urlencoded({extended: false}))

initTable()

app.post("/signIn/post", async (req, res) => {
    const data = req.body;
    bcrypt.genSalt(saltRound, (err,salt) => {
        bcrypt.hash(data.password, salt, async (err,hash) => {
            data.password = hash
            try {
                const insert = await User.create(data)
                res.redirect("/")
            } catch(e){
                console.log(e)
                res.send("acces denid")
            }
        })
    })
})

app.post("/login/post", async (req, res) => {
    const data = req.body;
    const auth = await User.findOne({ where: { email:data.email }});
    bcrypt.compare(data.password, auth.password, (err,result) => {
        result ? res.redirect(`/UserSpace/${auth.id}`) : res.send("Acces denided")
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});