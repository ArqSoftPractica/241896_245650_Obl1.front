import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import AcceptInvite from 'src/components/family/AcceptInvite';
import AuthLayout from 'src/layouts/AuthLayout';
import { NextPageWithLayout } from './_app';

const InvitePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { token } = router.query as { token: string };

  return (
    <Grid container spacing={0} display="flex" justifyContent="center">
      <Grid item lg={4}>
        <AcceptInvite token={token} />
      </Grid>
    </Grid>
  );
};

InvitePage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default InvitePage;
