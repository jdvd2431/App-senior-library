import React from 'react';
import ChartModule from './ChartModule';

const ActiveUsersChart = ({ data, options, title,type}) => {
  return (
    <ChartModule data={data} options={options} title={title} type={type} />
  );
};

export default ActiveUsersChart;
