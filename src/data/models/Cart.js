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

    const Cart = sequelize.define(alias, cols, config);

    /*
    Cart.associate = function(models) {
        Cart.hasMany(models.Movie, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "movies", // El nombre del modelo pero en plural
            foreignKey: "genre_id"
        })
    }
    */



    return Cart;



}