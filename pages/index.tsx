import { Grid } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import CategoriesChart from 'src/components/categories/chart/CategoriesChart';
import FullLayout from 'src/layouts/FullLayout';
import Expenses from '../src/components/expenses/Expenses';
import { NextPageWithLayout } from './_app';

const ExpensesPage: NextPageWithLayout = () => {
  const [fromDate, setFromDate] = useState<Date>(() => {
    const todayDate = new Date();
    return new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
  });

  const [toDate, setToDate] = useState<Date>(() => {
    const todayDate = new Date();
    return new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 23, 59, 59);
  });

  const handleFromDateChange = (date: Date | null): void => {
    if (date) {
      setFromDate(date);
    }
  };

  const handleToDateChange = (date: Date | null): void => {
    if (date) {
      setToDate(date);
    }
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Expenses
          fromDate={fromDate}
          toDate={toDate}
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
        />
        <CategoriesChart fromDate={fromDate} toDate={toDate} />
      </Grid>
    </Grid>
  );
};

ExpensesPage.getLayout = (page: ReactElement) => {
  return <FullLayout>{page}</FullLayout>;
};

export default ExpensesPage;
