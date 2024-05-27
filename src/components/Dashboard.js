import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BookList from './book/bookList';
import AddBookModal from './book/AddBookModal';

const Dashboard = () => {
  const location = useLocation();
  const responseAuth = location.state?.responseAuth || {};
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [user] = useState(responseAuth);
  console.log(user)
 

  const handleOpenAddBookModal = () => {
    setIsAddBookModalOpen(true); // Abre el modal al hacer clic en el botón "Add New Book"
  };

  const handleCloseAddBookModal = () => {
    setIsAddBookModalOpen(false); // Cierra el modal
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={8} textAlign="center">
          <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive' }}>
            Your Library
          </Typography>
        </Grid>
      </Grid>
      <Box mt={4} mb={4}>
        <Box sx={{ p: 4 }}>
          <BookList user={responseAuth} /> {/* Asegúrate de que el componente BookList esté configurado correctamente */}
        </Box>
      </Box>
      {responseAuth.role === 'admin' && (
        <Grid container justifyContent="center" mt={4} mb={4}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOpenAddBookModal}>
              Add New Book
            </Button>
          </Grid>
        </Grid>
      )}
      {/* Modal para agregar un nuevo libro */}
      <AddBookModal open={isAddBookModalOpen} onClose={handleCloseAddBookModal} />
    </Box>
  );
};

export default Dashboard;
