import express from "express"
import { handler as astroHandler } from "./dist/server/entry.mjs";
import * as orm from "./src/db/schema"

const app = express();
const PORT = 3000;
const base = '/'

app.get("/api/test", (req, res) => {
    res.json([
        { name: "test" , lastName: "moi" },
        { name: "Second" , lastName: "test"}
    ])
});

app.post("/signIn", async (req, res) => {
    const data = req.body;

    const validate:{pseudo : string, email:string,password:string } = 
})

app.use(base, express.static("dist/client/"));
app.use(astroHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});