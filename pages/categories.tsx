import { Grid } from '@mui/material';
import useUser from 'hooks/useUser';
import React, { ReactElement, useMemo } from 'react';
import Categories from 'src/components/categories/table/Categories';
import FullLayout from 'src/layouts/FullLayout';
import { NextPageWithLayout } from './_app';

const CategoriesPage: NextPageWithLayout = () => {
  const allowedRoles = useMemo(() => ['admin'], []);

  const { user } = useUser({ redirectTo: '/', allowedRoles });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Categories />
      </Grid>
    </Grid>
  );
};

CategoriesPage.getLayout = (page: ReactElement) => {
  return <FullLayout>{page}</FullLayout>;
};

export default CategoriesPage;
