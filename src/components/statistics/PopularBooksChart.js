import React from 'react';
import ChartModule from './ChartModule';

const PopularBooksChart = ({ data, options, title,type }) => {
  return (
    <ChartModule data={data} options={options} title={title} type={type} />
  );
};

export default PopularBooksChart;
