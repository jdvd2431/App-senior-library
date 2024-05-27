import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import LoginForm from './components/FormLogin';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Statistics from './components/Statistics';
import MainLayout from './components/MainLayout';
import FormRegister from './components/FormRegister';
import { Navigate } from 'react-router-dom';
import CategoryList from './components/category/categoryList';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="*" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
      <Box
        sx={{
          p: 2,
          backgroundColor: '#333',
          color: '#fff',
          textAlign: 'center',
          opacity: 0.8,
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        &copy; {new Date().getFullYear()} AppSenior - Todos los derechos reservados
      </Box>
    </Router>
  );
};

export default App;
