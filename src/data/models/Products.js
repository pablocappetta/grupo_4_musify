module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: dataTypes.DECIMAL(5,2),
        },
        producer: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        product_description: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        product_image: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        popularity: {
            type: dataTypes.INTEGER,
        },
        users_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true
        },
        genre_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true
        }
    };

    let config = {
        tableName: 'Products',
        timestamps: false
    }

    const Products = sequelize.define(alias, cols, config);
    return Products;
}