import express from "express"
import { handler as astroHandler } from "./dist/server/entry.mjs";

const { Sequelize } = require('sequelize');

import { User } from "./src/db/db";

const app = express();
const PORT = 3000;
const base = '/'

app.post("/signIn", async (req, res) => {
    const data = req.body;
    const insert = await User.create(data)
    console.log(`Insertion of ${data.id} : OK`)
})

app.use(base, express.static("dist/client/"));
app.use(astroHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});