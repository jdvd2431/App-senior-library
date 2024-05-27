import React from 'react';
import ChartModule from './ChartModule';

const LoanTrendsChart = ({ data, options, title,type }) => {
  return (
    <ChartModule data={data} options={options} title={title} type={type} />
  );
};

export default LoanTrendsChart;
