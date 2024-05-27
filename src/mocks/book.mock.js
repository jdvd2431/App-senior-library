// mocks/book.mock.js

export const mockCreateBook = jest.fn((bookData) => {
  return Promise.resolve({ id: 1, title: bookData.title, author: bookData.author });
});

export const mockEditBook = jest.fn((updatedBook) => {
  return Promise.resolve({ id: updatedBook.id, title: updatedBook.title, author: updatedBook.author });
});

export const mockDeleteBook = jest.fn((id) => {
  return Promise.resolve({ id });
});
