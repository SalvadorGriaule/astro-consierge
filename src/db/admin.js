import bcrypt from "bcrypt"
import { Admin, User } from "./db.js"


const seedAdmin = async () => {
    if (await Admin.count() == 0) {
        bcrypt.hash("adminPass", 10, async (err, hash) => {
            const newAdmin = Admin.create({ email: "leseulquiadelacultureici@gmail.com", password: hash })
        })
    }
}

const allUser = async () => {
    console.log(await User.count());
    
    const data = await User.findOne({where: {id : 1}});
    console.log(data);
    return data
}


export { seedAdmin, allUser }