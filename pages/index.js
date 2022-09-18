import { Grid } from '@mui/material';
import ExpensesTable from '../src/components/expenses/ExpensesTable';

const Tables = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ExpensesTable />
      </Grid>
    </Grid>
  );
};

export default Tables;
