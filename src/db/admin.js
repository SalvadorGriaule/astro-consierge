import bcrypt from "bcrypt"
import { Admin,User } from "./db.js"

const seedAdmin = async () => {
    if (await Admin.count() == 0) {
        bcrypt.hash("adminPass", 10, async (err, hash) => {
            const newAdmin = Admin.create({ email: "leseulquiadelacultureici@gmail.com", password: hash })
        })
    }
}

const allUser = async() => {
    const data = await User.findAll();
    console.log(data);
    return data    
}


export { seedAdmin , allUser}