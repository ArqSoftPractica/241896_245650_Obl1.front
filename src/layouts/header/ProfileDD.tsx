import React from 'react';
import FeatherIcon from 'feather-icons-react';
import Image from 'next/image';
import { Box, Menu, Typography, Link, ListItemButton, List, ListItemText, Button, Divider } from '@mui/material';
import userimg from '../../../assets/images/users/user2.jpg';

const ProfileDD: React.FC<Record<string, never>> = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = ({ currentTarget }) => {
    setAnchorEl4(currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

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
          <Image src={userimg} alt="Image" width="30" height="30" className="roundedCircle" />
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
              Julia
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
          <Box p={2} pt={0}>
            <List component="nav" aria-label="secondary mailbox folder" onClick={handleClose4}>
              <ListItemButton>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />
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
