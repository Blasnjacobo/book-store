import { request } from "express";
import { Book } from "../models/bookModel.js";

// Ruta para guardar un nuevo libro
export const postBook = async (request, response) => {
    try {
        // Verificar si se proporcionan todos los campos requeridos
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        // Crear un nuevo libro usando el modelo de Mongoose
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        // Respuesta exitosa
        return response.status(201).send(book);
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
};


export const getAllBooks = async (request, response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })   
    }
}

export const bookByID = async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id)
        return response.status(200).json(book)
    } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })   
    }
}

export const updateBook = async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send(
                {
                message: 'Send all required fields: title, author, publishYear'
                });
            } 

            const { id } = request.params
            const result = await Book.findByIdAndUpdate(id, request.body)

            if (!result) {
                return response.status(404).json({ message: 'Book not found to update'})
            }

            return response.status(200).send({ message: ' Book updated successfully'})
        } catch (error) {
            console.error(error.message);
            return response.status(500).send({ message: error.message });
        }
}

export const deleteByID = async (request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return response.status(404).json({ message: 'Book not found to delete '})
        }
        return response.status(200).send({ message: ' Book deleted successfully'})
    } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })   
    }
}