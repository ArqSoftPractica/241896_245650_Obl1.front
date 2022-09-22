import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import BaseCard from '../baseCard/BaseCard';
import Family from '../../../assets/images/users/family.svg';

const roles = [
  { name: 'Admin', value: 'Admin' },
  { name: 'Member', value: 'Member' },
];

const InviteFamilyMember: React.FC<Record<string, never>> = () => {
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
          <TextField id="email" label="Email*" variant="outlined" fullWidth />
          <TextField id="role" select label="Role*" variant="outlined" fullWidth>
            {roles.map(({ value, name }) => (
              <MenuItem key={value} value={value}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <Button fullWidth={false} style={{ width: '100px' }} size="large" variant="outlined" color="primary">
            Invite
          </Button>
        </Stack>
      </Box>
    </BaseCard>
  );
};

export default InviteFamilyMember;
