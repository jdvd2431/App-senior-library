import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import { createLoan } from '../../services/loan';
import Swal from 'sweetalert2';

const AddLoanModal = ({ open, onClose, userId, book }) => {
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async () => {
    const newLoan = {
      user_id: userId.id,
      book_id: book.id,
      loan_date: loanDate,
      return_date: returnDate,
    };

    // Validación de campos
    const errors = {};
    if (!newLoan.loan_date) errors.loan_date = 'Loan date is required';
    if (!newLoan.return_date) errors.return_date = 'Return date is required';
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await createLoan(newLoan);
      setLoading(false);
      onClose(); // Cerrar el modal antes de mostrar la alerta
      Swal.fire({
        icon: 'success',
        title: 'Loan Created',
        text: 'The loan has been successfully created.',
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error('Error creating loan:', error);
      setLoading(false);
      onClose(); // Cerrar el modal antes de mostrar la alerta
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
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
        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      }}
    >
      <Fade in={open}>
        <Paper
          sx={{
            p: 3,
            maxWidth: 400,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Request Loan
          </Typography>
          <TextField
            label="Loan Date"
            type="date"
            fullWidth
            margin="normal"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            error={!!validationErrors.loan_date}
            helperText={validationErrors.loan_date}
          />
          <TextField
            label="Return Date"
            type="date"
            fullWidth
            margin="normal"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            error={!!validationErrors.return_date}
            helperText={validationErrors.return_date}
          />
          <Box mt={2} textAlign="center">
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default AddLoanModal;
