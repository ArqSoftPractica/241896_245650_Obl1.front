import { Grid } from '@mui/material';
import useSession from 'hooks/useSession';
import React, { ReactElement } from 'react';
import SignUp from 'src/components/signUp/SignUp';
import AuthLayout from 'src/layouts/AuthLayout';
import { NextPageWithLayout } from './_app';

const SignUpPage: NextPageWithLayout = () => {
  const { authorized } = useSession();

  if (!authorized) {
    return <div>Loading...</div>;
  }

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
