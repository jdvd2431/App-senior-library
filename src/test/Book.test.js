import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditBookModal from '../components/book/EditBookModal';
import { editBook } from '../services/book';

jest.mock('../services/book', () => ({
  editBook: jest.fn(),
}));

const mockBook = {
  id: 1,
  title: 'Book Title',
  author: 'Book Author',
  description: 'Book Description',
  isbn: '978-1234567890',
  pages: 200,
  category: 'Fiction',
  stock: 10,
};

describe('EditBookModal', () => {
  test('renders with initial book data', () => {
    render(<EditBookModal open={true} onClose={() => {}} book={mockBook} />);

    expect(screen.getByLabelText('Title')).toHaveValue('Book Title');
    expect(screen.getByLabelText('Author')).toHaveValue('Book Author');
    expect(screen.getByLabelText('Description')).toHaveValue('Book Description');
    expect(screen.getByLabelText('ISBN')).toHaveValue('978-1234567890');
    expect(screen.getByLabelText('Pages')).toHaveValue(mockBook.pages);
    expect(screen.getByLabelText('Category')).toHaveValue('Fiction');
    expect(screen.getByLabelText('Stock')).toHaveValue(10);
  });

  test('handles input changes and updates editedBook state', () => {
    render(<EditBookModal open={true} onClose={() => {}} book={mockBook} />);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Book Title' } });
    expect(screen.getByLabelText('Title')).toHaveValue('New Book Title');

    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Book Author' } });
    expect(screen.getByLabelText('Author')).toHaveValue('New Book Author');

    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'New Book Description' } });
    expect(screen.getByLabelText('Description')).toHaveValue('New Book Description');

    fireEvent.change(screen.getByLabelText('ISBN'), { target: { value: '978-0123456789' } });
    expect(screen.getByLabelText('ISBN')).toHaveValue('978-0123456789');

    fireEvent.change(screen.getByLabelText('Pages'), { target: { value: 300 } });
    expect(screen.getByLabelText('Pages')).toHaveValue(300);

    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Non-Fiction' } });
    expect(screen.getByLabelText('Category')).toHaveValue('Non-Fiction');

    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '15' } });
    expect(screen.getByLabelText('Stock')).toHaveValue(15);
  });

  
  test('handles save changes correctly', async () => {
    editBook.mockResolvedValueOnce();

    render(<EditBookModal open={true} onClose={() => {}} book={mockBook} />);

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Book Title' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Book Author' } });
    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(editBook).toHaveBeenCalledWith({
        id: 1,
        title: 'New Book Title',
        author: 'New Book Author',
        description: 'Book Description',
        isbn: '978-1234567890',
        pages: 200,
        category: 'Fiction',
        stock: 10,
      });
    });
  });
});

