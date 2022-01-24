module.exports = (sequelize, dataTypes) => {

    // the name sequelize calls our table from the code (singular)
    let alias = 'Cart';
 
    // Columns that sequelize is going to read from our table
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
            //autoIncrement: true
        },
        products_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            //autoIncrement: true
        }
    };

    // Configurations
    let config = {
        tableName: 'cart',                      // Table Name in DataBase
        timestamps: false
    }

    // define model with alias, colums and configuration
    const Cart = sequelize.define(alias, cols, config);


    // ** Associations ** //
    Cart.associate = function(models) {
        
        Cart.belongsToMany(models.Product, {          // value from alias 
            as: "products",                     // Relationship name
            through: "cartsproducts",
            foreignKey: "id",
            otherKey:"productId",
            timestamps: false
        });

        Cart.hasMany(models.User, {
            as: "users",
            foreignKey: "users_id"
        });
    }

    return Cart;

}