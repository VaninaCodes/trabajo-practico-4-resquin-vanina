// validaciones
import { extensions } from 'sequelize/lib/utils/validator-extras';
import Movie from '../models/movie.model.js';

// funcion auxiliar
function validateMovieFields ({ title, genre, duration, year, synopsis}){
    // se devuelve un array de string con los errores
    const errors = [];

    // titulo obligatorio
    if (typeof title !== 'string' || title.trim() === ''){
        errors.push('El campo title es obligatorio y debe tipo texto.');
    }

    // genre obligatorio
    if (typeof genre !== 'string' || genre.trim() === ''){
        errors.push('El campo genre es obligatorio y debe ser tipo texto.');
    }

    // duracion obligatorio, entero, mayor a 0, no string y no decimal
    if (duration === undefined || duration === null || duration === ''){
        errors.push('El campo duration es obligatorio.');
    } else if (typeof duration !== 'number' || !Number.isInteger(duration) || duration <= 0) {
        errors.push('El campo duration debe ser un numero entero mayor a 0 (no se aceptan: texto, decimales o negativos ni cero).');
    }

    // year obligatorio, entero de 4 digitos, entre 1888 y el año actual
    const currentYear = new Date().getFullYear();
    if (year === undefined || year === null || year === ''){
        errors.push('El campo year es obligatorio.')
    } else if (typeof year !== 'number' || !Number.isInteger(year) || String(Math.abs(year)).length !== 4 || year < 1888 || year > currentYear) {
        errors.push('El campo year debe ser un numero entero de 4 digitos (entre el año 1888 y el año actual).');
    }

    // synopsis opcional en string
    if (synopsis !== undefined && synopsis !== null && typeof synopsis !== 'string'){
        errors.push('El campo synopsis debe ser tipo texto.');
    }
    return errors;
}

// GET /api/movies
// Obtener todas las peliculas
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las peliculas', error: error.message});
    }
};

// GET /api/movies/:id
// Obtener pelicula por id
export const getMoviesById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({ message: `No se encontro ninguna pelicula con id: ${id}.`});
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar la pelicula.', error: error.message});
    }
};

// POST /api/movies
// Agregar una pelicula
export const createMovie = async (req, res) => {
    try {
        const errors = validateMovieFields(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Datos invalidos.', errors});
        }

        const { title } = req.body;
        //  busca si ya existe una pelicula con ese nombre
        const exitingMovie = await Movie.findOne({ where: { title }});
        if (exitingMovie) {
            return res.status(400).json({ message: `Ya existe una pelicula registrada con el titulo: ${titulo}`});
        }
        // si no hay problemas crea la pelicula
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message:  'Error al crear la pelicula.', error: error.message});
    }
};

// PUT /api/movies/:id
// Actualizar una pelicula
export const updateMovie = async (req, res) => {
    try{
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({ message: `No se encontro ninguna pelicula con id: ${id}.`});
        }

        const errors = validateMovieFields(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Datos invalidos', errors});
        }
        const { title } = req.body;
        // busca si la pelicula existe
        const existingMovie = await Movie.findOne({ where: { title } });
        // se fija si el titulo no choca con un titulo existente
        if (existingMovie && existingMovie.id !== movie.id) {
            return res.status(400).json({ message: `Ya existe otra pelicula registrada con el titulo: ${title}.`});
        }

        await movie.update(req.body);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la pelicula.', error: error.message});
    }
};

// DELETE /api/movies/:id
// Borrar una pelicula
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        // busca si la pelicula existe
        if(!movie){
            return res.status(404).json({ message: `No se encontro ninguna pelicula con id: ${id}.`});
        }
        // si existe destroy()
        await movie.destroy();
        res.status(200).json({ message: `Pelicula con id: ${id} eliminada.`});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la pelicula.', error:error.message});
    }
};