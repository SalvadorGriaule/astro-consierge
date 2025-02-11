import { Sequelize, DataTypes, Model } from "sequelize";

// const db = new Sequelize("mysql://root@localhost:3306/igor")
const db = new Sequelize("mysql://root2:pass@localhost:3306/igor")

class User extends Model { }
class EmailStandBy extends Model { }
class ResetPassword extends Model { }
class Admin extends Model { }
class Igor extends Model { }
class Task extends Model { }
class Gerant extends Model { }

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
        },
        data: {
            type: DataTypes.JSON,
            defaultValue: {}
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

    Igor.init({
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
        }, ville: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    }, {
        sequelize: db,
        modelName: "Igor",
        timestamps: true,
        createdAt: true,
        updatedAt: false
    }
    )

    Gerant.init({
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        }, password: {
            type: DataTypes.STRING,
            allowNull: false
        }, etablisment: {
            type:DataTypes.STRING,
            defaultValue:null
        }
    }, {
        sequelize: db,
        modelName: "Gerant",
        timestamps: true,
        createdAt: true,
        updatedAt: false
    }
    )

    Task.init({
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descritption: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['en attente', 'en cours', 'fait', "échec"]
        },
        limiteDate: {
            type:DataTypes.DATE,
            defaultValue: null
        }, rallyPoint: {
            type:DataTypes.STRING,
            defaultValue:null
        },rallyPointDate:{
            type:DataTypes.DATE,
            defaultValue:null
        }
    }, {
        sequelize: db,
        modelName: "Task",
        timestamps: true,
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

    User.hasMany(Task);
    Igor.hasMany(Task);
    Task.belongsTo(User);
    Task.belongsTo(Igor);
    Gerant.hasMany(Igor);
    Igor.belongsTo(Gerant);

    await db.sync({ alter: true })
}

export { initTable, User, EmailStandBy, ResetPassword, Admin, Igor, Gerant, Task, db }