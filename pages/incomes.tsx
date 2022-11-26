import { Grid } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import Incomes from 'src/components/incomes/Incomes';
import FullLayout from 'src/layouts/FullLayout';
import { NextPageWithLayout } from './_app';

const IncomesPage: NextPageWithLayout = () => {
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
        <Incomes
          fromDate={fromDate}
          toDate={toDate}
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
        />
      </Grid>
    </Grid>
  );
};

IncomesPage.getLayout = (page: ReactElement) => {
  return <FullLayout>{page}</FullLayout>;
};

export default IncomesPage;
