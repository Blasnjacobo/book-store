import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from './routes/booksRouter.js'


const app = express();
console.log('parte1')


// Middleware para permitir el análisis de JSON en las solicitudes
app.use(express.json());

/* ROUTES WITH FILES */
// app.post('/books', postBook)

/* ROUTES */
app.use('/books', booksRoutes)

console.log('parte2')

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is running at PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });