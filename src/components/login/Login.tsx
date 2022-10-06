import { useState } from 'react';
import NextLink from 'next/link';
import router from 'next/router';
import { logIn } from 'src/services/auth.service';
import { Button, Stack, TextField, Typography } from '@mui/material';
import LogoIcon from 'src/layouts/logo/LogoIcon';
import { toast } from 'react-toastify';
import validator from 'validator';
import BaseCard from '../baseCard/BaseCard';

const Login: React.FC<Record<string, never>> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
  };

  const handleLogIn = async () => {
    logIn({ email, password })
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <BaseCard>
      <Stack spacing={4.5} borderColor="primary" display="flex" alignItems="center" paddingX={3} paddingY={1.5}>
        <LogoIcon width={220} height={80} />
        <TextField id="email" label="Email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          fullWidth={false}
          style={{ width: '100px' }}
          size="large"
          variant="outlined"
          color="secondary"
          onClick={handleLogIn}
          disabled={!validator.isEmail(email) || password.length < 8}
        >
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
