// CategoryList.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  Typography, 
  CircularProgress, 
  Menu, 
  MenuItem, 
  IconButton,
  Grid,
  Paper,
  Avatar,
  Box,
  Snackbar
} from '@mui/material';
import { MoreVert, Edit, Visibility, Add, Delete } from '@mui/icons-material';
import CustomModal from './CustomModal';
import EditCategoryModal from './EditCategoryModal';
import CreateCategoryModal from './CreateCategoryModal';
import useCategory from '../../hooks/useCategory';
import Swal from 'sweetalert2';
import { Alert } from '@mui/material';

const CategoryList = () => {
  const { listCategoryHandler, deleteCategoryHandler } = useCategory();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user from session storage:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await listCategoryHandler();
      setCategories(response || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message || 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  }, [listCategoryHandler]);

  const handleMenuOpen = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const handleViewDetails = (selectedCategory) => {
    setSelectedCategoryDetails(selectedCategory);
    setOpenModal(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleDeleteClick = async (categoryId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategoryHandler(categoryId);
          Swal.fire(
            '¡Eliminado!',
            'La categoría ha sido eliminada.',
            'success'
          );
          // Vuelve a cargar los datos después de eliminar
          fetchData();
        } catch (error) {
          console.error('Error deleting category:', error);
          Swal.fire(
            '¡Error!',
            'Hubo un error al eliminar la categoría.',
            'error'
          );
        }
      }
    });
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Categorías
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        {user && user.role === 'admin' && (
          <IconButton color="primary" onClick={handleCreateClick}>
            <Add />
          </IconButton>
        )}
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="secondary" />
        </Box>
      ) : error ? (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{`Error: ${error}`}</Alert>
        </Snackbar>
      ) : (
        <Grid container spacing={1}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id} style={{ listStyle: 'none' }}>
              <Paper elevation={3}>
                <ListItem button onClick={() => handleViewDetails(category)}>
                  <Avatar style={{ backgroundColor: '#3f51b5' }}>{category.name.charAt(0)}</Avatar>
                  <ListItemText primary={category.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={(event) => handleMenuOpen(event, category)}>
                      <MoreVert />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {user && user.role === 'admin' && (
          <MenuItem onClick={() => handleEditClick(selectedCategory)}>
            <Edit fontSize="small" style={{ marginRight: '8px' }} />
            Editar Categoría
          </MenuItem>
        )}
        <MenuItem onClick={() => handleViewDetails(selectedCategory)}>
          <Visibility fontSize="small" style={{ marginRight: '8px' }} />
          Ver Detalles
        </MenuItem>
        {user && user.role === 'admin' && (
          <MenuItem onClick={() => handleDeleteClick(selectedCategory.id)}>
            <Delete fontSize="small" style={{ marginRight: '8px' }} />
            Eliminar Categoría
          </MenuItem>
        )}
      </Menu>

      <CustomModal open={openModal} onClose={() => setOpenModal(false)} selectedCategory={selectedCategoryDetails} />
      <EditCategoryModal open={isEditModalOpen} onClose={handleCloseEditModal} category={selectedCategory} />
      <CreateCategoryModal open={isCreateModalOpen} onClose={handleCloseCreateModal} />
    </Box>
  );
};

export default CategoryList;
