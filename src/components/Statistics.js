import React from 'react';
import useStatistics from '../hooks/useStatistics';
import PopularBooksChart from './statistics/PopularBooksChart';
import ActiveUsersChart from './statistics/ActiveUsersChart';
import LoanByCategoryChart from './statistics/LoanByCategoryChart';
import AverageLoanDuration from './statistics/AverageLoanDuration';
import LoanTrendsChart from './statistics/LoanTrendsChart';
import UserOverdeuLoansChart from './statistics/UserOverdeuLoansChart';
import { Grid } from '@mui/material';

const Statistics = () => {
  const { data: { popularBooks, activeUsers, loanByCategorys, averangeDurations, loanTrends, userOverdeuLoans }, error } = useStatistics();

  const popularBooksChartData = {
    labels: popularBooks.map(book => book.title),
    datasets: [
      {
        label: 'Libros Populares',
        data: popularBooks.map(book => book.loan_count),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const activeUsersChartData = {
    labels: activeUsers.map(user => user.name),
    datasets: [
      {
        label: 'Usuarios activos',
        data: activeUsers.map(user => user.loan_count),
      },
    ],
  };

  const processLoanByCategoryData = {
    labels: loanByCategorys.map(loanByCategory => loanByCategory.category),
    datasets: [
      {
        label: 'Categoria de libro mas prestada',
        data: loanByCategorys.map(loanByCategory => loanByCategory.loan_count),
      },
    ],
  };

  const processLoanTrendsCData = {
    labels: loanTrends.map(data => data.month),
    datasets: [
      {
        label: 'Identificar a los usuarios con préstamos vencidos y la cantidad de préstamos vencidos',
        data: loanTrends.map(data => data.loan_count),
      },
    ],
  };

  return (
    <Grid container spacing={2} sx={{ '& > *': { marginBottom: 2 } }}>
      {/* Row 1 - Popular Books and Average Duration */}
      <Grid item xs={12} md={6} lg={4}>
        <PopularBooksChart
          data={popularBooksChartData}
          options={chartOptions}
          title="Estadísticas de Libros Populares"
          type="bar"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <AverageLoanDuration averageDuration={averangeDurations.avg_duration}/>
      </Grid>

      {/* Row 2 - Active Users and Loan by Category */}
      <Grid item xs={12} md={6} lg={4}>
        <ActiveUsersChart
          data={activeUsersChartData}
          options={chartOptions}
          title="Usuarios Activos"
          type="line"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <LoanByCategoryChart
          data={processLoanByCategoryData}
          options={chartOptions}
          title="Categoria de libro mas prestada"
          type="doughnut"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <LoanTrendsChart
          data={processLoanTrendsCData}
          options={chartOptions}
          title="Las tendencias de préstamos a lo largo del tiempo, por mes"
          type="radar"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <UserOverdeuLoansChart
          users={userOverdeuLoans}
        />
      </Grid>
    </Grid>
  );
};

export default Statistics;
