import express from 'express'
import { postBook, getAllBooks, bookByID, updateBook, deleteByID } from '../controllers/books.js' 

const router = express.Router()

router.get('/', getAllBooks)
router.get('/:id', bookByID)
router.post('/', postBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteByID)

export default router