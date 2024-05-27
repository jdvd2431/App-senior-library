import { createLoan } from '../services/loan';

jest.mock('../services/loan', () => ({
  createLoan: jest.fn(),
}));

describe('Loan Service', () => {
  test('creates a loan successfully', async () => {
    const mockFormData = {
      user_id: 1,
      book_id: 1,
      loan_date: '2024-05-28',
      return_date: '2024-06-04',
    };

    createLoan.mockResolvedValueOnce({ message: 'Loan created successfully' });

    const response = await createLoan(mockFormData);

    expect(createLoan).toHaveBeenCalledWith(mockFormData);
    expect(response).toEqual({ message: 'Loan created successfully' });
  });

  test('handles error when creating a loan', async () => {
    const errorMessage = 'Error creating loan';
    const mockFormData = {
      user_id: 1,
      book_id: 1,
      loan_date: '2024-05-28',
      return_date: '2024-06-04',
    };

    createLoan.mockRejectedValueOnce(new Error(errorMessage));

    await expect(createLoan(mockFormData)).rejects.toThrow(errorMessage);
    expect(createLoan).toHaveBeenCalledWith(mockFormData);
  });
});
