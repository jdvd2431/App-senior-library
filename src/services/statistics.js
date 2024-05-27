// book.js (Servicio de libros)
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const popularBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics/popular-books`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Si la respuesta tiene un código de estado 400, muestra un mensaje específico
      throw new Error('Error al recuperar los libros populares.');
    } else if (error.request && error.request.response) {
      // Si hay un error en la solicitud y la respuesta está presente, muestra el mensaje de error del servidor
      throw new Error(error.response.data.error);
    } else {
      // Si no se puede determinar la causa del error, muestra un mensaje genérico
      throw new Error('An unexpected error occurred');
    }
  }
};

const activeUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics/active-users`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Si la respuesta tiene un código de estado 400, muestra un mensaje específico
      throw new Error('Error al recuperar los users .');
    } else if (error.request && error.request.response) {
      // Si hay un error en la solicitud y la respuesta está presente, muestra el mensaje de error del servidor
      throw new Error(error.response.data.error);
    } else {
      // Si no se puede determinar la causa del error, muestra un mensaje genérico
      throw new Error('An unexpected error occurred');
    }
  }
};

const loanByCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics/loans-by-category`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Si la respuesta tiene un código de estado 400, muestra un mensaje específico
      throw new Error('Error al recuperar los users .');
    } else if (error.request && error.request.response) {
      // Si hay un error en la solicitud y la respuesta está presente, muestra el mensaje de error del servidor
      throw new Error(error.response.data.error);
    } else {
      // Si no se puede determinar la causa del error, muestra un mensaje genérico
      throw new Error('An unexpected error occurred');
    }
  }
};

const averageDuration = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics/average-loan-duration`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Si la respuesta tiene un código de estado 400, muestra un mensaje específico
      throw new Error('Error al recuperar los users .');
    } else if (error.request && error.request.response) {
      // Si hay un error en la solicitud y la respuesta está presente, muestra el mensaje de error del servidor
      throw new Error(error.response.data.error);
    } else {
      // Si no se puede determinar la causa del error, muestra un mensaje genérico
      throw new Error('An unexpected error occurred');
    }
  }
};

const loanTrend = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics/loan-trends`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Si la respuesta tiene un código de estado 400, muestra un mensaje específico
      throw new Error('Error al recuperar los users .');
    } else if (error.request && error.request.response) {
      // Si hay un error en la solicitud y la respuesta está presente, muestra el mensaje de error del servidor
      throw new Error(error.response.data.error);
    } else {
      // Si no se puede determinar la causa del error, muestra un mensaje genérico
      throw new Error('An unexpected error occurred');
    }
  }
};

const userOverdeuLoan = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics/users-with-overdue-loans`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Si la respuesta tiene un código de estado 400, muestra un mensaje específico
      throw new Error('Error al recuperar los users .');
    } else if (error.request && error.request.response) {
      // Si hay un error en la solicitud y la respuesta está presente, muestra el mensaje de error del servidor
      throw new Error(error.response.data.error);
    } else {
      // Si no se puede determinar la causa del error, muestra un mensaje genérico
      throw new Error('An unexpected error occurred');
    }
  }
};


export { popularBooks,activeUser,loanByCategory,averageDuration,loanTrend,userOverdeuLoan };
