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
        tableName: 'UserCategory',
        timestamps: false
    }

    const UserCategory = sequelize.define(alias, cols, config);
    return UserCategory;
}