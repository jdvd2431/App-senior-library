// Importamos lo necesario de testing-library
import { render, screen } from '@testing-library/react';
// Importamos el componente Statistics
import Statistics from '../components/Statistics';
// Importamos el hook useStatistics
import useStatistics from '../hooks/useStatistics';

// Mock de useStatistics para evitar errores de importación
jest.mock('../hooks/useStatistics');

describe('Statistics component', () => {
  test('renders all chart components with correct data', () => {
    // Datos simulados para los componentes
    const mockData = {
      popularBooks: [
        { title: 'El principito2', loan_count: 11 },
      ],
      activeUsers: [
        { name: 'Test User', loan_count: 10 },
      ],
      loanByCategorys: [
        { category: 'Infantil', loan_count: 11 },
      ],
      averangeDurations: { avg_duration: 13 },
      loanTrends: [
        { month: '2024-05', loan_count: 16 },
      ],
      userOverdeuLoans: [], // No hay datos de préstamos vencidos en este caso de prueba
    };

    // Mock del hook useStatistics para devolver los datos simulados
    useStatistics.mockReturnValue({ data: mockData, error: null });

    // Renderizamos el componente Statistics
    render(<Statistics />);

    // Verificamos que los componentes estén siendo renderizados con los datos correctos
    expect(screen.getByText('El principito2')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Infantil')).toBeInTheDocument();
    expect(screen.getByText('13')).toBeInTheDocument();
    expect(screen.getByText('May 2024')).toBeInTheDocument();
  });
});
