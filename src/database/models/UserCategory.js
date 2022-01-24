module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategory';

    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_type: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        }
    };

    let config = {
        tableName: 'User_category',          // Table Name in DataBase
        timestamps: false
    }

    const UserCategory = sequelize.define(alias, cols, config);
    
    // ** Associations ** //
    UserCategory.associate = function(models) {
        
        UserCategory.hasMany(models.User, {  // value from alias
            as: "users",                     // Relationship name 
            foreignKey: "category_id"        // Foreing Key from colums
        });
    }

    return UserCategory;
}