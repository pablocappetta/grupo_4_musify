module.exports = (sequelize, dataTypes) => {
    let alias = 'User';

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
            //autoIncrement: true
        }
    };

    let config = {  
        tableName: 'users',                         // Table Name in DataBase
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);
  
    // ** Associations ** //
    User.associate = function(models) {
        User.belongsTo(models.UserCategory, {       // value from alias   
            as: "UserCategory",                     // Relationship name
            foreignKey: "category_id"               // Foreing Key from colums
        });  

        User.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "users_id"
        });

    }

    return User;
}