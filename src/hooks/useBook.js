// useBook.js (Hook personalizado)
import { useState } from 'react';
import { createBook ,editBook,deleteBook} from '../services/book';

const useBook = () => {
  const [error, setError] = useState(null);

  const createBookHandler = async (bookData) => {
    try {
      setError(null);
      const response = await createBook(bookData);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const editBookHandler = async (bookData) => {
    try {
      setError(null);
      const response = await editBook(bookData);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteBookHandler = async (id) => {
    try {
      setError(null);
      const response = await deleteBook(id);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };


  return { error, createBook: createBookHandler, editBook: editBookHandler,deleteBook:deleteBookHandler };
};

export default useBook;
