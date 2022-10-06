import React from 'react';
import { Link } from '@mui/material';
import Image from 'next/image';
import LogoDark from '../../../assets/images/logos/logo-dark.svg';

interface Props {
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  width: 110,
  height: 40,
};

const LogoIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <Link href="/">
      <Image src={LogoDark} alt={LogoDark} width={width} height={height} />
    </Link>
  );
};

LogoIcon.defaultProps = defaultProps;

export default LogoIcon;
