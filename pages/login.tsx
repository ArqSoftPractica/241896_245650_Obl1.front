import { Grid } from '@mui/material';
import useSession from 'hooks/useSession';
import React, { ReactElement } from 'react';
import Login from 'src/components/login/Login';
import AuthLayout from 'src/layouts/AuthLayout';
import { NextPageWithLayout } from './_app';

const LoginPage: NextPageWithLayout = () => {
  const { authorized } = useSession();

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={0} display="flex" justifyContent="center">
      <Grid item lg={4}>
        <Login />
      </Grid>
    </Grid>
  );
};

LoginPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
