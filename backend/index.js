import express from "express";
import mongoose from "mongoose";
import booksRoutes from './routes/booksRouter.js'
import dotenv from 'dotenv'
import cors from 'cors'


const app = express()

dotenv.config()

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)


// Middleware para permitir el análisis de JSON en las solicitudes
app.use(express.json());

/* ROUTES WITH FILES */
// app.post('/books', postBook)

/* ROUTES */
app.use('/books', booksRoutes)

const PORT = process.env.PORT

mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is running at PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });