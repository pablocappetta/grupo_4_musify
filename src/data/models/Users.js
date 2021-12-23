module.exports = (sequelize, dataTypes) => {
    let alias = 'Genres';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genre_name: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        }
    };

    let config = {
        tableName: 'genres',
        timestamps: false
    }

    const Genres = sequelize.define(alias, cols, config);
    return Genres;
}