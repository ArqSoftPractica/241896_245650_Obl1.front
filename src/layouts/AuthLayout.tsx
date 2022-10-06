import React from 'react';
import { experimentalStyled, Container, Box } from '@mui/material';
import Footer from './footer/Footer';

const MainWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));

const PageWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
}));

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <MainWrapper>
      <PageWrapper>
        <Container maxWidth={false}>
          <Box sx={{ minHeight: 'calc(100vh - 86px)', display: 'flex', alignItems: 'center' }}>{children}</Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default AuthLayout;
