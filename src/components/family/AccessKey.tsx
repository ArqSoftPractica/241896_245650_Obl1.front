import { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseDialog from '../baseDialog/BaseDialog';

const AccessKey: React.FC<Record<string, never>> = () => {
  const [isRefreshKeyOpen, setIsRefreshKeyOpen] = useState<boolean>(false);

  const handleRefreshKeyOpen = () => {
    setIsRefreshKeyOpen(true);
  };

  const handleRefreshKeyClose = () => {
    setIsRefreshKeyOpen(false);
  };

  const handleRefreshKey = () => {
    console.log('refresh key');
    handleRefreshKeyClose();
  };

  return (
    <>
      <Card sx={{ border: '1px #a7e3f4 solid', width: '650px', p: '30px' }}>
        <Box p={2} paddingTop={0} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h2">App Access Key (API KEY)</Typography>
        </Box>
        <Box width="100%" marginTop={2} display="flex" columnGap={4} paddingLeft={1}>
          <TextField
            sx={{ width: '401px' }}
            variant="outlined"
            disabled
            label="API KEY"
            value="API-KEY-123e4567-e89b-12d3-a456-426614174000"
            size="small"
          />
          <Button
            style={{ width: '130px' }}
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleRefreshKeyOpen}
          >
            <FeatherIcon icon="refresh-ccw" width="15" height="15" style={{ marginRight: '5px' }} />
            REFRESH
          </Button>
        </Box>
      </Card>
      <BaseDialog
        onClose={handleRefreshKeyClose}
        title="Refresh API KEY"
        open={isRefreshKeyOpen}
        acceptButtonHandler={handleRefreshKey}
      >
        <Typography marginY={2} textAlign="center">
          Are you sure you want to refresh the API KEY?
        </Typography>
      </BaseDialog>
    </>
  );
};

export default AccessKey;
