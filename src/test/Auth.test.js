import { login, validateToken } from '../services/auth'; // Importamos las funciones de autenticación

jest.mock('../services/auth.js', () => ({
  login: jest.fn(),
  validateToken: jest.fn(),
}));

describe('Authentication Services', () => {
  test('login function successfully logs in with valid credentials', async () => {
    login.mockResolvedValueOnce({ token: 'fake-token', user: { username: 'test-user' } });

    const email = 'test@example.com';
    const password = 'password123';

    const token = await login(email, password);

    expect(token).toEqual({ token: 'fake-token', user: { username: 'test-user' } });
    expect(login).toHaveBeenCalledWith(email, password);
  });

  test('validateToken function successfully validates token', async () => {
    const token = 'fake-token';
    const userData = { username: 'test-user' };

    validateToken.mockResolvedValueOnce(userData);

    const user = await validateToken(token);

    expect(user).toEqual(userData);
    expect(validateToken).toHaveBeenCalledWith(token);
  });
});
