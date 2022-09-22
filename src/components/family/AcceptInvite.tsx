import { Button, Stack, TextField, Typography } from '@mui/material';
import LogoIcon from 'src/layouts/logo/LogoIcon';
import BaseCard from '../baseCard/BaseCard';

const AcceptInvite: React.FC<Record<string, never>> = () => {
  return (
    <BaseCard>
      <Stack spacing={3} borderColor="primary" display="flex" alignItems="center" paddingX={3}>
        <Stack spacing={2} display="flex" alignItems="center">
          <LogoIcon width={220} height={80} />
          <Typography>Sign up to join the Secinaro family</Typography>
        </Stack>
        <TextField id="name" label="Name" variant="outlined" fullWidth />
        <TextField id="email" label="Email" variant="outlined" fullWidth />
        <TextField id="password" label="Password" type="password" variant="outlined" fullWidth />
        <Button fullWidth={false} style={{ width: '100px' }} size="large" variant="outlined" color="secondary">
          Sign Up
        </Button>
      </Stack>
    </BaseCard>
  );
};

export default AcceptInvite;
