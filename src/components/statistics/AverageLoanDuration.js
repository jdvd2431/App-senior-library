import React from 'react';
import { Card, CardContent, Typography, Chip, Grid } from '@mui/material';

const AverageLoanDuration = ({ averageDuration }) => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom component="div">
              Promedio de Duración de Préstamos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {typeof averageDuration === 'number' && (
              <Chip variant="outlined" size="large" label={`${averageDuration.toFixed(2)} días`} />
            )}
            {!typeof averageDuration === 'number' && <Typography variant="body2">Datos No Disponibles</Typography>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AverageLoanDuration;
