import React from 'react';
import { Card, CardContent, Typography, Chip, Grid } from '@mui/material';

const UserOverdeuLoansChart = ({ users }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom component="div">
          Usuarios con Préstamos Vencidos
        </Typography>
        <Grid container spacing={2}>
          {users.map(user => (
            <Grid item xs={12} key={user.id}>
              <Card variant="outlined" sx={{ padding: 1 }}>
                <CardContent>
                  <Typography variant="subtitle1">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Número de Préstamos Vencidos: {user.overdue_loans_count}
                  </Typography>
                  <Chip
                    label={user.overdue_loans_count === 1 ? '1 Préstamo Vencido' : `${user.overdue_loans_count} Préstamos Vencidos`}
                    color="secondary"
                    size="small"
                    sx={{ marginTop: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserOverdeuLoansChart;
