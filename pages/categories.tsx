import { Grid } from '@mui/material';
import React from 'react';
import CategoriesTable from 'src/components/categories/CategoriesTable';

const Tables: React.FC<Record<string, never>> = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <CategoriesTable />
      </Grid>
    </Grid>
  );
};

export default Tables;
