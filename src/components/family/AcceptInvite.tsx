import { Button, Stack, TextField, Typography } from '@mui/material';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LogoIcon from 'src/layouts/logo/LogoIcon';
import { acceptInvite, getInvite } from 'src/services/register.service';
import validator from 'validator';
import BaseCard from '../baseCard/BaseCard';

export interface Props {
  token: string;
}

const AcceptInvite: React.FC<Props> = ({ token }) => {
  const [familyName, setFamilyName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (token) {
      getInvite({ token })
        .then(
          ({
            invite: {
              email,
              family: { name },
            },
          }) => {
            setFamilyName(name);
            setUserEmail(email);
          },
        )
        .catch(({ message }) => {
          toast.error(message);
        });
    }
  }, [token]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setUserEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPassword(value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setUserName(value);
  };

  const handleSignUp = () => {
    acceptInvite({ invitationToken: token, email: userEmail, password, name: userName })
      .then(({ message }) => {
        toast.success(message);
        router.push('/login');
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  return (
    <BaseCard>
      <Stack spacing={3} borderColor="primary" display="flex" alignItems="center" paddingX={3}>
        <Stack spacing={2} display="flex" alignItems="center">
          <LogoIcon width={220} height={80} />
          <Typography>Sign up to join the {familyName} family</Typography>
        </Stack>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          onChange={handleUserNameChange}
          value={userName}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          onChange={handleEmailChange}
          value={userEmail}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handlePasswordChange}
          value={password}
        />
        <Button
          fullWidth={false}
          style={{ width: '100px' }}
          size="large"
          variant="outlined"
          color="secondary"
          onClick={handleSignUp}
          disabled={!validator.isEmail(userEmail) || password.length < 8 || !userName}
        >
          Sign Up
        </Button>
      </Stack>
    </BaseCard>
  );
};

export default AcceptInvite;
