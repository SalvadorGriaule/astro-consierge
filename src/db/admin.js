import bcrypt from "bcrypt"
import { getSession } from "./session.js"
import { Admin } from "./db.js"

const seedAdmin = async () => {
    if (await Admin.count() == 0) {
        bcrypt.hash("adminPass", 10, async (err, hash) => {
            const newAdmin = Admin.create({ email: "admin@astro.com", password: hash })
        })
    }
}

const fetchJwt = async (url,sessionID) => {
    const session = await getSession(sessionID); 
    if(session.jwt){
        const data = await fetch(url,{ method:"GET",headers:{'Authorization': `Bearer ${session.jwt}`}})
        const json = await data.json()
        return json
    }
}


export { seedAdmin, fetchJwt }