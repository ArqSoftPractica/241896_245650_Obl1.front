import { Button, Stack, TextField } from '@mui/material';
import LogoIcon from 'src/layouts/logo/LogoIcon';
import BaseCard from '../baseCard/BaseCard';

const Login: React.FC<Record<string, never>> = () => {
  return (
    <BaseCard>
      <Stack spacing={4} borderColor="primary" display="flex" alignItems="center" padding={3}>
        <LogoIcon width={220} height={80} />
        <TextField id="amount-basic" label="Email" variant="outlined" fullWidth />
        <TextField id="amount-basic" label="Password" type="password" variant="outlined" fullWidth />
        <Button fullWidth={false} style={{ width: '100px' }} size="large" variant="outlined" color="secondary">
          Log In
        </Button>
      </Stack>
    </BaseCard>
  );
};

export default Login;
