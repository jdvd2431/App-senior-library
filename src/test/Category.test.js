import { renderHook, act } from '@testing-library/react-hooks';
import useCategory from '../hooks/useCategory';
import {
    listCategoryHandlers,
  editCategoryHandlers,
  createCategoryHandlers,
  deleteCategoryHandlers,
} from '../services/category';

jest.mock('../services/category.js', () => ({
    listCategoryHandlers: jest.fn(), 
  editCategoryHandlers: jest.fn(),
  createCategoryHandlers: jest.fn(),
  deleteCategoryHandlers: jest.fn(),
}));

  
  it('debería crear una nueva categoría correctamente', async () => {
    const newCategory = { name: 'Nueva Categoría' };
    const mockCreatedCategory = { name: 'Nueva Categoría' };
    createCategoryHandlers.mockResolvedValue([mockCreatedCategory]);

    const { result } = renderHook(() => useCategory());

    await act(async () => {
      await result.current.createCategoryHandler(newCategory);
    });

    expect(createCategoryHandlers).toHaveBeenCalledWith(newCategory);
    expect(result.current.categories).toEqual([mockCreatedCategory]);
    expect(result.current.error).toBeNull();
  });

  it('debería manejar el error al crear una nueva categoría', async () => {
    const newCategory = { name: 'Nueva Categoría' };
    const mockError = 'Error al crear la categoría';
    createCategoryHandlers.mockRejectedValue(new Error(mockError));

    const { result } = renderHook(() => useCategory());

    await act(async () => {
      await result.current.createCategoryHandler(newCategory);
    });

    expect(createCategoryHandlers).toHaveBeenCalledWith(newCategory);
    expect(result.current.categories).toBeNull();
    expect(result.current.error).toBe(mockError);
  });



  it('debería manejar el error al editar una categoría', async () => {
    const id = 1;
    const editedCategory = { name: 'Categoría Editada' };
    const mockError = 'Error al editar la categoría';
    editCategoryHandlers.mockRejectedValue(new Error(mockError));

    const { result } = renderHook(() => useCategory());

    await act(async () => {
      await result.current.editCategoryHandler(id, editedCategory);
    });

    expect(editCategoryHandlers).toHaveBeenCalledWith(id, editedCategory);
    expect(result.current.categories).toBeNull();
    expect(result.current.error).toBe(mockError);
  });

  it('debería eliminar una categoría correctamente', async () => {
    const id = 1;
    const mockResponse = { message: 'Categoría eliminada' };
    deleteCategoryHandlers.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCategory());

    await act(async () => {
      await result.current.deleteCategoryHandler(id);
    });

    expect(deleteCategoryHandlers).toHaveBeenCalledWith(id);
    expect(result.current.categories).toEqual(mockResponse);
    expect(result.current.error).toBeNull();
  });

  it('debería manejar el error al eliminar una categoría', async () => {
    const id = 1;
    const mockError = 'Error al eliminar la categoría';
    deleteCategoryHandlers.mockRejectedValue(new Error(mockError));

    const { result } = renderHook(() => useCategory());

    await act(async () => {
      await result.current.deleteCategoryHandler(id);
    });

    expect(deleteCategoryHandlers).toHaveBeenCalledWith(id);
    expect(result.current.categories).toBeNull();
    expect(result.current.error).toBe(mockError);
  });
