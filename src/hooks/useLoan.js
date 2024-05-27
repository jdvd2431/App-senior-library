// useBook.js (Hook personalizado)
import { useState } from 'react';
import { createLoan} from '../services/loan';

const useLoan = () => {
  const [error, setError] = useState(null);

  const createLoanHandler = async (loanData) => {
    try {
      setError(null);
      const response = await createLoan(loanData);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };


  return { error, createLoan: createLoanHandler };
};

export default useLoan;
