import React from 'react';
import { experimentalStyled, Container, Box } from '@mui/material';
import Footer from './footer/Footer';

const MainWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));

const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('lg')]: {
    paddingTop: '64px',
  },
  [theme.breakpoints.down('lg')]: {
    paddingTop: '64px',
  },
}));

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <MainWrapper>
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: '20px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default AuthLayout;
