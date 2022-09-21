import NextLink from 'next/link';
import { Button, Stack, TextField, Typography } from '@mui/material';
import LogoIcon from 'src/layouts/logo/LogoIcon';
import BaseCard from '../baseCard/BaseCard';

const Login: React.FC<Record<string, never>> = () => {
  return (
    <BaseCard>
      <Stack spacing={4.5} borderColor="primary" display="flex" alignItems="center" paddingX={3} paddingY={1.5}>
        <LogoIcon width={220} height={80} />
        <TextField id="amount-basic" label="Email" variant="outlined" fullWidth />
        <TextField id="amount-basic" label="Password" type="password" variant="outlined" fullWidth />
        <Button fullWidth={false} style={{ width: '100px' }} size="large" variant="outlined" color="secondary">
          Log In
        </Button>
        <Typography>
          Don&apos;t have an account? <NextLink href="/signup">Sign up</NextLink>
        </Typography>
      </Stack>
    </BaseCard>
  );
};

export default Login;
