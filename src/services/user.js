// book.js (Servicio de libros)
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const updateUser = async (id,bodyUser) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, bodyUser); 
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Si la respuesta tiene un código de estado 400, muestra un mensaje específico
      throw new Error('Error al actualizar usuario.');
    } else if (error.request && error.request.response) {
      // Si hay un error en la solicitud y la respuesta está presente, muestra el mensaje de error del servidor
      throw new Error(error.response.data.error);
    } else {
      // Si no se puede determinar la causa del error, muestra un mensaje genérico
      throw new Error('An unexpected error occurred');
    }
  }
};


export { updateUser };
