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
            unique: true
        },
        users_id: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        products_id: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    };

    let config = {
        tableName: 'cart',
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);
    return Genres;
}