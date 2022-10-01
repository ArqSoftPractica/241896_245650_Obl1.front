import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { signUp } from 'src/services/register.service';
import { Button, Stack, TextField, Typography } from '@mui/material';
import LogoIcon from 'src/layouts/logo/LogoIcon';
import BaseCard from '../baseCard/BaseCard';

const SignUp: React.FC<Record<string, never>> = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [familyName, setFamilyName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleNameChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const handleEmailChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  const handleFamilyNameChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(value);
  };

  const handlePasswordChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
  };

  const handleSignUp = async () => {
    signUp({ name, email, familyName, password })
      .then(({ message }) => {
        toast.success(message);
        router.push('/login');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <BaseCard>
      <Stack spacing={3} borderColor="primary" display="flex" alignItems="center" paddingX={3}>
        <Stack spacing={2} display="flex" alignItems="center">
          <LogoIcon width={220} height={80} />
          <Typography>Sign up as an administrator of your family</Typography>
        </Stack>
        <TextField id="name" label="Name" variant="outlined" fullWidth value={name} onChange={handleNameChange} />
        <TextField id="email" label="Email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} />
        <TextField
          id="family-name"
          label="Family Name"
          variant="outlined"
          fullWidth
          value={familyName}
          onChange={handleFamilyNameChange}
        />
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
          onClick={handleSignUp}
        >
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
