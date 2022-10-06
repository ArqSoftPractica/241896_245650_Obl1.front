import { Grid } from '@mui/material';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CategoriesChart from 'src/components/categories/chart/CategoriesChart';
import FullLayout from 'src/layouts/FullLayout';
import { getExpensesPerCategory } from 'src/services/expenses.service';
import Expenses from '../src/components/expenses/Expenses';
import { NextPageWithLayout } from './_app';

const ExpensesPage: NextPageWithLayout = () => {
  const [chartData, setChartData] = React.useState<ApexAxisChartSeries | ApexNonAxisChartSeries | undefined>();
  const [categories, setCategories] = React.useState<string[]>();
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

  const fetchExpensesPerCategory = useCallback(() => {
    getExpensesPerCategory({ fromDate, toDate })
      .then(({ expensesPerCategory }) => {
        const data = expensesPerCategory.length > 0 ? expensesPerCategory.map(({ totalAmount }) => +totalAmount) : [];
        const categoriesData = expensesPerCategory.length > 0 ? expensesPerCategory.map(({ name }) => name) : [];
        setChartData([{ data, name: 'Total Amount' }]);
        setCategories(categoriesData);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchExpensesPerCategory();
    // eslint-disable-next-line no-console
    console.log('fetchExpensesPerCategory');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Expenses
          fromDate={fromDate}
          toDate={toDate}
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
          fetchExpensesPerCategory={fetchExpensesPerCategory}
        />
        <CategoriesChart fromDate={fromDate} toDate={toDate} chartData={chartData} categories={categories} />
      </Grid>
    </Grid>
  );
};

ExpensesPage.getLayout = (page: ReactElement) => {
  return <FullLayout>{page}</FullLayout>;
};

export default ExpensesPage;
