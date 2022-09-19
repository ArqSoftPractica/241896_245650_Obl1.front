import { Grid } from '@mui/material';
import React from 'react';
import ExpensesTable from '../src/components/expenses/ExpensesTable';

const Expenses: React.FC<Record<string, never>> = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ExpensesTable />
      </Grid>
    </Grid>
  );
};

export default Expenses;
