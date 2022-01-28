module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';

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
            //autoIncrement: true
        },
        genre_id: {
            type: dataTypes.INTEGER,
            //autoIncrement: true
        }
    };

    let config = {
        tableName: 'Products',                      // Table Name in DataBase
        timestamps: false
    }

    const products = sequelize.define(alias, cols, config);

    
    // ** Associations ** //
    products.associate = function(models) {
        products.belongsTo(models.Genre, {          // value from alias 
            as: "genre",                            // Relationship name
            foreignKey: "genre_id"                  // Foreing Key from colums
        });

        products.belongsToMany(models.Cart, {
            as: "carts",
            through: "cartsproducts",
            foreignKey: "productId",
            otherKey:"cartId",
            timestamps: false
        });

        products.belongsTo(models.User, {
            as: "user",
            foreignKey: "users_id"
        });
  
    }
    
    return products;
}