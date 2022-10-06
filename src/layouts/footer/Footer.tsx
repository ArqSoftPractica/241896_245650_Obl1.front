import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC<Record<string, never>> = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography>
        © 2022 All rights reserved by Fernanda Secinaro (245650) - Juan Pablo Rodríguez Sotto (241896)
      </Typography>
    </Box>
  );
};

export default Footer;
