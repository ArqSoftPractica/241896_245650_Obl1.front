import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { inviteNewMember } from 'src/services/register.service';
import { toast } from 'react-toastify';
import validator from 'validator';
import BaseCard from '../baseCard/BaseCard';
import Family from '../../../assets/images/users/family.svg';

const roles = [
  { name: 'Admin', value: 'admin' },
  { name: 'User', value: 'user' },
];

const InviteFamilyMember: React.FC<Record<string, never>> = () => {
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('user');

  const handleEmailChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  const handleRoleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setRole(value);
  };

  const handleInvite = () => {
    inviteNewMember({ email, role })
      .then(({ message }) => {
        setEmail('');
        toast.success(message);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  return (
    <BaseCard>
      <Typography variant="h2" padding={3}>
        Add Family Member
      </Typography>
      <Box display="flex" justifyContent="space-between" paddingRight={10}>
        <Image src={Family} alt="Family" width={400} height={320} />
        <Stack
          spacing={4.5}
          borderColor="primary"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={400}
        >
          <TextField
            id="email"
            label="Email*"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            id="role"
            select
            label="Role*"
            variant="outlined"
            fullWidth
            value={role}
            onChange={handleRoleChange}
          >
            {roles.map(({ value, name }) => (
              <MenuItem key={value} value={value}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            fullWidth={false}
            style={{ width: '100px' }}
            size="large"
            variant="outlined"
            color="primary"
            onClick={handleInvite}
            disabled={!validator.isEmail(email)}
          >
            Invite
          </Button>
        </Stack>
      </Box>
    </BaseCard>
  );
};

export default InviteFamilyMember;
