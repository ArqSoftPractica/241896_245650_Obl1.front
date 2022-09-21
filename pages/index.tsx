import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';
import CategoriesChart from 'src/components/categories/chart/CategoriesChart';
import FullLayout from 'src/layouts/FullLayout';
import ExpensesTable from '../src/components/expenses/ExpensesTable';
import { NextPageWithLayout } from './_app';

const ExpensesPage: NextPageWithLayout = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ExpensesTable />
        <CategoriesChart />
      </Grid>
    </Grid>
  );
};

ExpensesPage.getLayout = (page: ReactElement) => {
  return <FullLayout>{page}</FullLayout>;
};

export default ExpensesPage;
