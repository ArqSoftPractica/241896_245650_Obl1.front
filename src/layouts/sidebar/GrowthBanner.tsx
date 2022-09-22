import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import Growth from '../../../assets/images/users/Growth.svg';

const GrowthBanner = () => (
  <Box pb={5} mt={5} marginTop={40}>
    <Box
      sx={{
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <Image src={Growth} alt="Growth Banner" height={300} width={300} />
    </Box>
  </Box>
);
export default GrowthBanner;
