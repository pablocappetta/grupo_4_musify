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
    return Cart;
}