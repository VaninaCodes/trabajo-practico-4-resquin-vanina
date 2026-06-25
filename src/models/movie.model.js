// creacion del modelo
import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';

const Movie = sequelize.define(
    'Movie',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'movies',
        timestamps: true, //crea createdAt y updateAt automaticamente
    }
);

export default Movie;