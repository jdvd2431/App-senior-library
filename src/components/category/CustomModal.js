import React from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, Box } from '@mui/material';

const CustomModal = ({ open, onClose, selectedCategory }) => {
  const handleClose = () => {
    onClose(); // Llama a la función onClose para cerrar el modal
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
            {selectedCategory ? (
              <div>
                <Typography variant="h6" gutterBottom>
                  Detalles de la categoría
                </Typography>
                <Typography variant="body1">
                  Nombre: {selectedCategory.name}
                </Typography>
                <Typography variant="body1">
                  Fecha de creación: {new Date(selectedCategory.created_at).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Fecha de actualización: {new Date(selectedCategory.updated_at).toLocaleString()}
                </Typography>
              </div>
            ) : (
              <Typography variant="body1">
                No hay detalles de la categoría disponibles.
              </Typography>
            )}
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
