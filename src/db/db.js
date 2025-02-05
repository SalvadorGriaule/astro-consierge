import { Sequelize, DataTypes, Model } from "sequelize";

const db = new Sequelize("mysql://root@localhost:3306/igor")

class User extends Model { }

const initTable = async () => {
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, Infinity]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, Infinity]
            }
        }
    },
        {
            sequelize: db,
            modelName: "User",
            timestamps: true,
            createdAt: true,
            updatedAt: false
        }
    )

    await db.sync()
} 

export { initTable , User }