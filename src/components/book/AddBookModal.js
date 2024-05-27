import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { createBook } from '../../services/book';
import Swal from 'sweetalert2';

const AddBookModal = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pages, setPages] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newBook = { title, author, description, isbn, pages, category, stock };
      
      // Validación de campos
      const errors = {};
      if (!title) errors.title = 'Title is required';
      if (!author) errors.author = 'Author is required';
      if (!description) errors.description = 'Description is required';
      if (!isbn) errors.isbn = 'ISBN is required';
      if (!pages) errors.pages = 'Pages is required';
      if (!category) errors.category = 'Category is required';
      if (!stock) errors.stock = 'Stock is required';
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setLoading(false);
        return;
      }
      
      await createBook(newBook);
      setLoading(false);
      onClose(); // Cerrar el modal antes de mostrar la alerta
      Swal.fire({
        icon: 'success',
        title: 'Book Created',
        text: 'The book has been successfully created.',
        timer: 3000,
        timerProgressBar: true,
      });

      // Recargar la página después de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error creating book:', error);
      setLoading(false);
      onClose(); // Cerrar el modal antes de mostrar la alerta
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the book. Please try again later.',
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
      }}
    >
      <Fade in={open}>
        <Paper sx={{ p: 3, maxWidth: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" gutterBottom>
            Add New Book
          </Typography>
          {validationErrors.title && <Typography variant="body2" color="error">{validationErrors.title}</Typography>}
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!validationErrors.title}
          />
          {validationErrors.author && <Typography variant="body2" color="error">{validationErrors.author}</Typography>}
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={!!validationErrors.author}
          />
          {validationErrors.description && <Typography variant="body2" color="error">{validationErrors.description}</Typography>}
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!validationErrors.description}
          />
          {validationErrors.isbn && <Typography variant="body2" color="error">{validationErrors.isbn}</Typography>}
          <TextField
            label="ISBN"
            fullWidth
            margin="normal"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            error={!!validationErrors.isbn}
          />
          {validationErrors.pages && <Typography variant="body2" color="error">{validationErrors.pages}</Typography>}
          <TextField
            label="Pages"
            fullWidth
            margin="normal"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            error={!!validationErrors.pages}
          />
          {validationErrors.category && <Typography variant="body2" color="error">{validationErrors.category}</Typography>}
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={!!validationErrors.category}
          />
          {validationErrors.stock && <Typography variant="body2" color="error">{validationErrors.stock}</Typography>}
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            error={!!validationErrors.stock}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default AddBookModal;
