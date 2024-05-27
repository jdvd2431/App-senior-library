import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider, Typography, CircularProgress, Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import CustomModal from './CustomModal';
import EditBookModal from './EditBookModal';
import AddLoanModal from '../loan/AddLoanModal';
import { deleteBook } from '../../services/book';
import Swal from 'sweetalert2';

const BookList = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookDetails, setSelectedBookDetails] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLoanModalOpen, setLoanModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Limpiar el estado cuando se desmonta el componente
    return () => {
      // Limpiar el estado
    };
  }, []);

  const handleMenuOpen = (event, book) => {
    setAnchorEl(event.currentTarget);
    setSelectedBook(book);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBook(null);
  };

  const handleViewDetails = (selectedBook) => {
    setSelectedBookDetails(selectedBook); // Guardar los detalles del libro seleccionado
    setOpenModal(true); // Abrir el modal
  };
  
  const handleEditClick = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteBook = async (book) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        setLoading(true);
        await deleteBook(book.id);
        setLoading(false);
        await Swal.fire({
          icon: 'success',
          title: 'Book Deleted',
          text: 'The book has been successfully deleted.',
          timer: 3000,
          timerProgressBar: true
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error('Error deleting book:', error);
        setLoading(false);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the book. Please try again later.'
        });
      }
    }
  };
  
  const handleRequestLoan = (book) => {
    setSelectedBook(book);
    setLoanModalOpen(true);
    console.log('Loan requested for book:', book);
  };

  const handleCloseLoanModal = () => {
    setLoanModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Lista de Libros
      </Typography>
      {loading ? (
        <CircularProgress /> // Indicador de carga
      ) : error ? (
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
      ) : (
        <List>
          {books.map((book) => (
            <div key={book.id}>
              <ListItem>
                <ListItemText primary={book.title} secondary={book.author} />
                <IconButton onClick={(event) => handleMenuOpen(event, book)}>
                  <MoreVert />
                </IconButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}

      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {user.role === 'admin' && (
          <>
            <MenuItem onClick={() => handleEditClick(selectedBook)}>Editar Libro</MenuItem>
            <MenuItem onClick={() => handleDeleteBook(selectedBook)}>Eliminar Libro</MenuItem>
          </>
        )}
        <MenuItem onClick={() => handleViewDetails(selectedBook)}>Ver Detalles</MenuItem>
        {user.role !== 'admin' && (
          <MenuItem onClick={() => handleRequestLoan(selectedBook)}>Realizar Préstamo</MenuItem>
        )}
      </Menu>

      {/* Modal de detalles */}
      <CustomModal open={openModal} onClose={() => setOpenModal(false)} selectedBook={selectedBookDetails} />
      
      {/* Modal de edición */}
      <EditBookModal open={isEditModalOpen} onClose={handleCloseEditModal} book={selectedBook} />

      {/* Modal de préstamo */}
      <AddLoanModal open={isLoanModalOpen} onClose={handleCloseLoanModal} userId={user} book={selectedBook} />
    </div>
  );
};

export default BookList;
