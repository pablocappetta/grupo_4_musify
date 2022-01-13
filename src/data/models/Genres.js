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
    
    /*
    Cart.associate = function(models) {
        Cart.hasMany(models.Movie, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "movies", // El nombre del modelo pero en plural
            foreignKey: "genre_id"
        })
    }
    */
    
    return Genres;
}