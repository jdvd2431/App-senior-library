// useCategory.js
import { useState } from 'react';
import { listCategoryHandlers, editCategoryHandlers, createCategoryHandlers, deleteCategoryHandlers } from '../services/category';

const useCategory = () => {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  const listCategoryHandler = async () => {
    try {
      setError(null);
      const response = await listCategoryHandlers();
      setCategories(response);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const createCategoryHandler = async (newCategory) => {
    try {
      setError(null);
      const response = await createCategoryHandlers(newCategory);
      setCategories(response);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const editCategoryHandler = async (id, editedCategory) => {
    try {
      setError(null);
      const response = await editCategoryHandlers(id, editedCategory);
      setCategories(response);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteCategoryHandler = async (id) => {
    try {
      setError(null);
      const response = await deleteCategoryHandlers(id);
      setCategories(response);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { 
    categories,
    error,
    listCategoryHandler,
    createCategoryHandler,
    editCategoryHandler,
    deleteCategoryHandler,
  };
};

export default useCategory;
