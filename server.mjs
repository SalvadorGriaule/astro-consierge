import express from "express"
import bodyParser from "body-parser"
import { handler as astroHandler } from "./dist/server/entry.mjs";
import { initTable, User } from "./src/db/db.js";

const app = express();
const PORT = 3000;
const base = '/'

app.use(base, express.static("dist/client/"));
app.use(astroHandler);
app.use(bodyParser.urlencoded({extended: false}))

initTable()

app.post("/signIn/post", async (req, res) => {
    console.dir(req.body);
    const data = req.body;
    const insert = await User.create(data)
    console.log(`Insertion of ${insert.id} : OK`)
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});