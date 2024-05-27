// book.js (Servicio de libros)
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el libro');
  }
};

const editBook = async (updatedBook) => {
  try {
    const response = await axios.put(`${API_URL}/books/${updatedBook.id}`, updatedBook); // Envía la solicitud PUT al endpoint del libro específico
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Error al editar el libro');
  }

  
};
const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/books/${id}`); // Envía la solicitud PUT al endpoint del libro específico
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Error al eleiminar el libro');
  }
};

export { createBook,editBook,deleteBook };
