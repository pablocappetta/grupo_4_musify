module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        users_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        products_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        }
    };

    let config = {
        tableName: 'Cart',
        timestamps: false
    }

    const cart = sequelize.define(alias, cols, config);

    cart.associate = function(models) {
        cart.hasOne(models.User, { // models.User -> User es el valor de alias en Users.js
            as: "users", // El nombre del modelo pero en plural
            foreignKey: "user_id"
        })
    };



    return cart;



}