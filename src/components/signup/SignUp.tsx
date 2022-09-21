import NextLink from 'next/link';
import { Button, Stack, TextField, Typography } from '@mui/material';
import LogoIcon from 'src/layouts/logo/LogoIcon';
import BaseCard from '../baseCard/BaseCard';

const SignUp: React.FC<Record<string, never>> = () => {
  return (
    <BaseCard>
      <Stack spacing={3} borderColor="primary" display="flex" alignItems="center" paddingX={3}>
        <Stack spacing={2} display="flex" alignItems="center">
          <LogoIcon width={220} height={80} />
          <Typography>Sign up as an administrator of your family</Typography>
        </Stack>
        <TextField id="name" label="Name" variant="outlined" fullWidth />
        <TextField id="email" label="Email" variant="outlined" fullWidth />
        <TextField id="family-name" label="Family Name" variant="outlined" fullWidth />
        <TextField id="password" label="Password" type="password" variant="outlined" fullWidth />
        <Button fullWidth={false} style={{ width: '100px' }} size="large" variant="outlined" color="secondary">
          Sign Up
        </Button>
        <Typography>
          Have an account? <NextLink href="/login">Log in</NextLink>
        </Typography>
      </Stack>
    </BaseCard>
  );
};

export default SignUp;
