// rutas
import { Router } from "express";
import {
    getAllMovies,
    getMoviesById,
    createMovie,
    updateMovie,
    deleteMovie,
} from '../controllers/movie.controllers.js';

const router = Router();

router.get('/', getAllMovies);
router.get('/:id', getMoviesById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;