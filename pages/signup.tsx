import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';
import SignUp from 'src/components/signup/SignUp';
import AuthLayout from 'src/layouts/AuthLayout';
import { NextPageWithLayout } from './_app';

const SignUpPage: NextPageWithLayout = () => {
  return (
    <Grid container spacing={0} display="flex" justifyContent="center">
      <Grid item lg={4}>
        <SignUp />
      </Grid>
    </Grid>
  );
};

SignUpPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignUpPage;
