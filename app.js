// creacion del servidor
import express from 'express';
import sequelize from './src/config/database.js';
import movieRoutes from './src/routes/movie.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/movies', movieRoutes);

// middleware
app.use((req, res) => {
    res.status(404).json( {message: 'Ruta no encontrada.'});
});

// funcion para arrancar el servidor
const startServer = async () => {
    try {
        // prueba la conexion a la base de datos antes que nada
        await sequelize.authenticate();
        console.log('Contexion a la base de datos.');
        await sequelize.sync(); // se crea la tabla si no existe
        console.log('Modelos sincronizados');

        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('No se pudo conectar a la base de datos: ', error.message);
    }
};

startServer();