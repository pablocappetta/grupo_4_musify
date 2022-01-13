module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        description_producer: {
            type: dataTypes.STRING,
        },
        image_producer: {
            type: dataTypes.STRING,
        },
        category_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true
        }
    };

    let config = {
        tableName: 'Users',
        timestamps: false
    }
    
    const users = sequelize.define(alias, cols, config);

    users.associate = function(models) {
        users.hasOne(models.Cart, { // models.User -> User es el valor de alias en Users.js
            as: "cart", // El nombre del modelo pero en plural
            foreignKey: "user_id"
        })
    }
    
    return users;
}