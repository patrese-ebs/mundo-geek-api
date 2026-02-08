import "reflect-metadata";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { appDataSource } from './database/appDataSource.js';
import errorHandler from './middlewares/errorHandler.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Registro de Rotas
app.use('/categorias', categoriaRoutes);
app.use('/produtos', produtoRoutes);

// O errorHandler deve ser o ÚLTIMO middleware
app.use(errorHandler);

appDataSource.initialize()
    .then(() => {
        console.log("Database initialized!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("Database initialization error: ", error));
