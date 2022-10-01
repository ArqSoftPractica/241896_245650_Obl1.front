import { useEffect, useState } from 'react';
import { Box, Button, Card, Chip, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { getApiKey, refreshApiKey } from 'src/services/api-key.service';
import { toast } from 'react-toastify';
import BaseDialog from '../baseDialog/BaseDialog';

const AccessKey: React.FC<Record<string, never>> = () => {
  const [isRefreshKeyOpen, setIsRefreshKeyOpen] = useState<boolean>(false);
  const [familyApiKey, setFamilyApiKey] = useState<string>('');

  const handleRefreshKeyOpen = () => {
    setIsRefreshKeyOpen(true);
  };

  const handleRefreshKeyClose = () => {
    setIsRefreshKeyOpen(false);
  };

  const handleRefreshKey = () => {
    refreshApiKey()
      .then(({ message }) => {
        toast.success(message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    handleRefreshKeyClose();
  };

  useEffect(() => {
    getApiKey()
      .then(({ apiKey }) => {
        setFamilyApiKey(apiKey);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <>
      <Card sx={{ border: '1px #a7e3f4 solid', width: 'fit-content', p: '30px' }}>
        <Box p={2} paddingTop={0} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h2">App Access Key (API KEY)</Typography>
        </Box>
        <Box width="100%" marginTop={2} display="flex" columnGap={4}>
          <Chip
            variant="outlined"
            disabled
            label={familyApiKey}
            sx={{ borderRadius: '5px', fontSize: '16px' }}
            size="medium"
          />
          <Button
            style={{ width: '110px' }}
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
