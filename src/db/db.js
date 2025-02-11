import { Sequelize, DataTypes, Model } from "sequelize";

// const db = new Sequelize("mysql://root@localhost:3306/igor")
const db = new Sequelize("mysql://root2:pass@localhost:3306/igor")

class User extends Model { }
class EmailStandBy extends Model { }
class ResetPassword extends Model { }
class Admin extends Model { }

const initTable = async () => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
        },
        emailConfirm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        ville: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        postal: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        addres: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            sequelize: db,
            modelName: "Users",
            timestamps: true,
            createdAt: true,
            updatedAt: false
        }
    )

    Admin.init({
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
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: "admin",
        timestamps: true,
        createdAt: true,
        updatedAt: false
    }
    )

    EmailStandBy.init({
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: "EmailStandBy",
        timestamps: true,
        createdAt: true,
        updatedAt: false
    })

    ResetPassword.init({
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: db,
        modelName: "ResetPassword",
        timestamps: true,
        createdAt: true,
        updatedAt: false
    })

    await db.sync()
}

export { initTable, User, EmailStandBy, ResetPassword, Admin, db }