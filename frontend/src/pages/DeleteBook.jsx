/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const handleDeleteBook = () => {
    setLoading(true)
    fetch(`http://localhost:5555/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setLoading(false)
      navigate('/')
    }).catch((error) => {
      setLoading(false)
      alert('An error happened. Please check console')
      console.log(error)
    })
  }
  return (
    <div>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text 2xl'>Are you sure you want to delete this book?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook
