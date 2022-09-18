import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme/theme';
import FullLayout from '../src/layouts/FullLayout';
import '../styles/style.css';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Flexy</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
          <Component {...pageProps} />
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
