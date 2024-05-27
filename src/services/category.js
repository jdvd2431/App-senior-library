// src/services/category.js
const axios = require('axios'); // Use CommonJS syntax

const API_URL = 'http://127.0.0.1:8000/api';

export const listCategoryHandlers = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las categorías');
  }
};

export const editCategoryHandlers = async (id, editedCategory) => {
  try {
    const response = await axios.post(`${API_URL}/categories/${id}`, editedCategory);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la categoría');
  }
};

export const createCategoryHandlers = async (newCategory) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, newCategory);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la categoría');
  }
};

export const deleteCategoryHandlers = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar la categoría');
  }
};
