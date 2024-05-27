import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Box, Typography, CircularProgress, Paper, Container } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Validación de schema con Yup
const validationSchema = yup.object().shape({
  email: yup.string().email('Correo electrónico no válido').required('Correo electrónico obligatorio'),
  password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Contraseña obligatoria'),
});

// Animación de fondo degradado
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

// Estilo para el contenedor principal con animación de degradado
const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 15s ease infinite`,
}));

// Estilo para el componente de papel que contiene el formulario
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

// Estilo para el texto flotante con animación
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

const FormLogin = () => {
  const { login, validateToken, error } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = await login(values.email, values.password);
        if (token) {
          const responseAuth = await validateToken(token);
          console.log(responseAuth);
          sessionStorage.setItem('token', token);
          navigate('/dashboard', { state: { responseAuth: responseAuth } });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <StyledContainer>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <FloatingText variant="h2">Bienvenido a la Biblioteca</FloatingText>
      </Box>
      <StyledPaper elevation={6}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            color="primary"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            fullWidth
            sx={{ mb: 2 }}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRegister}
            fullWidth
            sx={{ mb: 2 }}
          >
            Registrarse
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

export default FormLogin;
