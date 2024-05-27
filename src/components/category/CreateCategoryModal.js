import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, TextField, Button } from '@mui/material';
import useCategory from '../../hooks/useCategory';
import Swal from 'sweetalert2';

const CreateCategoryModal = ({ open, onClose }) => {
  // Llama al hook aquí, dentro del cuerpo del componente de función
  const { createCategoryHandler } = useCategory();
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const errors = {};
      if (!newCategory.name) errors.name = 'Name is required';
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setLoading(false);
        return;
      }

      await createCategoryHandler(newCategory);
      setLoading(false);
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Category Created',
        text: 'The category has been successfully created.',
        timer: 3000,
        timerProgressBar: true,
      });

      // Recargar la página después de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error creating category:', error);
      setLoading(false);
      onClose();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the category. Please try again later.',
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
            Create Category
          </Typography>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={newCategory.name}
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

export default CreateCategoryModal;
