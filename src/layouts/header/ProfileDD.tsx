import React, { useMemo } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Box, Menu, Typography, Link, Button } from '@mui/material';
import useUser from 'hooks/useUser';

const ProfileDD: React.FC<Record<string, never>> = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = ({ currentTarget }: { currentTarget: any }) => {
    setAnchorEl4(currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const allowedRoles = useMemo(() => ['admin', 'user'], []);

  const { user } = useUser({ redirectTo: '/', allowedRoles });

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name } = user;

  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },
              alignItems: 'center',
            }}
          >
            <Typography color="textSecondary" variant="h5" fontWeight="400" sx={{ ml: 1 }}>
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {name}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          '& .MuiMenu-paper': {
            width: '385px',
          },
        }}
      >
        <Box>
          <Box p={2}>
            <Link href="/login">
              <Button fullWidth variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
