import React from 'react';
import { Link } from '@mui/material';
import Image from 'next/image';
import LogoDark from '../../../assets/images/logos/logo-dark.svg';

const LogoIcon: React.FC<Record<string, never>> = () => {
  return (
    <Link href="/">
      <Image src={LogoDark} alt={LogoDark} />
    </Link>
  );
};

export default LogoIcon;
