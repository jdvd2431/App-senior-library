import React from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, Box } from '@mui/material';
import AddBookModal from './AddBookModal';

const CustomModal = ({ open, onClose, selectedBook }) => {
  const handleClose = () => {
    onClose(); // Llama a la función onClose para cerrar el modal
  };

  const handleSubmit = (bookData) => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose} // Usa handleClose para cerrar el modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } // Ajusta la opacidad del fondo
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh', // Centra verticalmente
            position: 'fixed', // Fija la posición para cubrir toda la pantalla
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1300 // Asegura que el modal esté encima del fondo oscuro
          }}
          onClick={handleClose} // Cierra el modal cuando se hace clic fuera de él
        >
          <Paper sx={{ p: 4, width: 600 }}>
            {selectedBook ? (
              <div>
                <Typography variant="h6" gutterBottom>
                  Detalles del libro
                </Typography>
                <Typography variant="body1">
                  Título: {selectedBook.title}
                </Typography>
                <Typography variant="body1">
                  Autor: {selectedBook.author}
                </Typography>
                <Typography variant="body1">
                  Descripción: {selectedBook.description}
                </Typography>
                <Typography variant="body1">
                  Categoría: {selectedBook.category}
                </Typography>
              </div>
            ) : (
              <AddBookModal onSubmit={handleSubmit} />
            )}
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
