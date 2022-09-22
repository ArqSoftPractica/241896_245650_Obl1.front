import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';
import AccessKey from 'src/components/family/AccessKey';
import InviteFamilyMember from 'src/components/family/InviteMember';
import FullLayout from 'src/layouts/FullLayout';
import { NextPageWithLayout } from './_app';

const InvitePage: NextPageWithLayout = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <InviteFamilyMember />
        <AccessKey />
      </Grid>
    </Grid>
  );
};

InvitePage.getLayout = (page: ReactElement) => {
  return <FullLayout>{page}</FullLayout>;
};

export default InvitePage;
