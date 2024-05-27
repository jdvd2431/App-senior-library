import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, TextField, Button } from '@mui/material';
import { editBook } from '../../services/book';
import Swal from 'sweetalert2';

const EditBookModal = (props) => {
  const { open, onClose, book } = props;
  const [editedBook, setEditedBook] = useState(book || {});
  const { title, author, description, isbn, pages, category, stock } = editedBook || {};
  const [ setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const editedBook = { id: book.id, title, author, description, isbn, pages, category, stock };

      const errors = {};
      if (!editedBook.title) errors.title = 'Title is required';
      if (!editedBook.author) errors.author = 'Author is required';
      if (!editedBook.description) errors.description = 'Description is required';
      if (!editedBook.isbn) errors.isbn = 'ISBN is required';
      if (!editedBook.pages) errors.pages = 'Pages is required';
      if (!editedBook.category) errors.category = 'Category is required';
      if (!editedBook.stock) errors.stock = 'Stock is required';
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setLoading(false);
        return;
      }

      await editBook(editedBook);
      setLoading(false);
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Book Updated',
        text: 'The book has been successfully updated.',
        timer: 3000,
        timerProgressBar: true,
      });

      // Recargar la página después de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating book:', error);
      setLoading(false);
      onClose();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the book. Please try again later.',
      });
    }
  };

  useEffect(() => {
    setEditedBook(book || {});
  }, [book]);

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
            Edit Book
          </Typography>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={handleChange}
            error={!!validationErrors.title}
            helperText={validationErrors.title}
          />
          <TextField
            name="author"
            label="Author"
            fullWidth
            margin="normal"
            value={author}
            onChange={handleChange}
            error={!!validationErrors.author}
            helperText={validationErrors.author}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={handleChange}
            error={!!validationErrors.description}
            helperText={validationErrors.description}
          />
          <TextField
            name="isbn"
            label="ISBN"
            fullWidth
            margin="normal"
            value={isbn}
            onChange={handleChange}
            error={!!validationErrors.isbn}
            helperText={validationErrors.isbn}
          />
          <TextField
            name="pages"
            label="Pages"
            fullWidth
            margin="normal"
            type="number"
            value={pages}
            onChange={handleChange}
            error={!!validationErrors.pages}
            helperText={validationErrors.pages}
          />
          <TextField
            name="category"
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={handleChange}
            error={!!validationErrors.category}
            helperText={validationErrors.category}
          />
          <TextField
            name="stock"
            label="Stock"
            fullWidth
            margin="normal"
            type="number"
            value={stock}
            onChange={handleChange}
            error={!!validationErrors.stock}
            helperText={validationErrors.stock}
          />
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EditBookModal;
