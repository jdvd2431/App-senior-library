import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, TextField, Button } from '@mui/material';
import { editCategoryHandlers } from '../../services/category'; // Importa la función para editar categorías
import Swal from 'sweetalert2';

const EditCategoryModal = (props) => {
  const { open, onClose, category } = props;
  const [editedCategory, setEditedCategory] = useState(category || {});
  const { id, name } = editedCategory || {};
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setEditedCategory(category || {});
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory({ ...editedCategory, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const errors = {};
      if (!editedCategory.name) errors.name = 'Name is required';
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setLoading(false);
        return;
      }

      await editCategoryHandlers(id, { name });
      setLoading(false);
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Category Updated',
        text: 'The category has been successfully updated.',
        timer: 3000,
        timerProgressBar: true,
      });

      // Recargar la página después de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating category:', error);
      setLoading(false);
      onClose();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the category. Please try again later.',
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
            Edit Category
          </Typography>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={handleChange}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />
          <Button variant="contained" color="primary" onClick={handleSaveChanges} disabled={loading}>
            Save Changes
          </Button>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EditCategoryModal;
