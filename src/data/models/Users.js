module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';

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
            autoIncrement: true
        }
    };

    let config = {
        tableName: 'Users',
        timestamps: false
    }

    const Users = sequelize.define(alias, cols, config);
    return Users;
}