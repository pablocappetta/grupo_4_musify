module.exports = (sequelize, dataTypes) => {

    // the name sequelize calls our table from the code (singular)
    let alias = 'Genre';

    // Columns that sequelize is going to read from our table
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

    // Configurations
    let config = {
        tableName: 'genres',                    // Table Name in DataBase
        timestamps: false
    }

    // define model with alias, colums and configuration
    const Genres = sequelize.define(alias, cols, config);

    // ** Associations ** //
    Genres.associate = function(models) {
        
        Genres.hasMany(models.Product, {        // value from alias 
            as: "products",                     // Relationship name
            foreignKey: "genre_id"              // Foreing Key from colums
        });
    }
    
    return Genres;
}