import { Box, Button, Card, TextField, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

const AccessKey: React.FC<Record<string, never>> = () => {
  return (
    <Card sx={{ border: '1px #a7e3f4 solid', width: '650px', p: '30px' }}>
      <Box p={2} paddingTop={0} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h2">App Access Key (API KEY)</Typography>
      </Box>
      <Box width="100%" marginTop={2} display="flex" columnGap={4} paddingLeft={1}>
        <TextField
          sx={{ width: '400px' }}
          variant="outlined"
          disabled
          label="API KEY"
          value="API-KEY-123e4567-e89b-12d3-a456-426614174000"
          size="small"
        />
        <Button style={{ width: '130px' }} size="small" variant="outlined" color="secondary">
          <FeatherIcon icon="refresh-ccw" width="15" height="15" style={{ marginRight: '5px' }} />
          REFRESH
        </Button>
      </Box>
    </Card>
  );
};

export default AccessKey;
