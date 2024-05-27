import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, CircularProgress, Box, Container, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import UpdateUserHandlers from '../hooks/useUser'; 
import Swal from 'sweetalert2';

const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo electrónico no válido').required('Correo electrónico obligatorio'),
});

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 15s ease infinite`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const FloatingText = styled(Typography)(({ theme }) => ({
  fontFamily: 'cursive',
  color: '#fff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  animation: `floating 3s ease-in-out infinite`,
  '@keyframes floating': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
}));

const UserProfile = () => {
  const navigate = useNavigate();
  const { UpdateUserHandler, error, success, loading } = UpdateUserHandlers(); // Obtener métodos y estado del hook personalizado

  // Obtener datos del usuario de la sesión
  const user = JSON.parse(sessionStorage.getItem('user')) || {};

  // Inicializar valores del formulario con los datos del usuario
  const formik = useFormik({
    initialValues: {
      name: user.name || '', // Obtén el nombre del usuario de la sesión
      email: user.email || '',
      role: user.role || '',  // Obtén el email del usuario de la sesión
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const editedUser = { name: values.name, email: values.email, role:values.role };
      try {
        // Actualizar el perfil del usuario llamando al método del hook
        const response = await UpdateUserHandler(user.id, editedUser);
          Swal.fire({
            icon: 'success',
            title: 'User Updated',
            text: 'Se ha actulizado correctamente el usuario, se redreccionara al login para volver a ingresar',
            timer: 3000,
            timerProgressBar: true,
          });
          navigate('/login');
          // Recargar la página después de 2 segundos
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        
        } catch (error) {
          console.error('Error updating User:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the User. Please try again later.',
          });
        } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <StyledContainer>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <FloatingText variant="h2">Actualizar Perfil de Usuario</FloatingText>
      </Box>
      <StyledPaper elevation={6}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalles del Usuario
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            variant="outlined"
            color="primary"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo electrónico"
            variant="outlined"
            color="primary"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Guardar Cambios'}
          </Button>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default UserProfile;
