import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ChartJS from 'chart.js/auto'; // Importamos ChartJS completo

const ChartModule = ({ data, options, title,type }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  

  useEffect(() => {
    if (chartRef.current && data.labels.length > 0) {
      if (chartInstance) {
        // Si ya hay una instancia del gráfico, actualizamos los datos y opciones
        chartInstance.data = data;
        chartInstance.options = options;
        chartInstance.update(); // Actualizamos el gráfico con los nuevos datos y opciones
      } else {
        // Si no hay una instancia del gráfico, creamos una nueva
            
        const newChartInstance = new ChartJS(chartRef.current, {
          type: type,
          data: data,
          options: options,
        });
        setChartInstance(newChartInstance);
      }
    }
  }, [data, options, chartInstance]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        {data.labels.length > 0 ? (
          <canvas ref={chartRef} />
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartModule;
