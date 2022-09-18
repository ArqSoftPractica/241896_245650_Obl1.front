import React, { useState } from 'react';
import NextLink from 'next/link';
import { Box, Drawer, useMediaQuery, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { useRouter } from 'next/router';
import LogoIcon from '../logo/LogoIcon';
import Menuitems from './MenuItems';

interface Props {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = useState<boolean>(true);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  const curl = useRouter();
  const location = curl.pathname;

  const SidebarContent = (
    <Box p={2} height="100%">
      <LogoIcon />
      <Box mt={2}>
        <List>
          {Menuitems.map((item, index) => (
            <List component="li" disablePadding key={item.title}>
              <NextLink href={item.href}>
                <ListItem
                  onClick={() => handleClick(index)}
                  button
                  selected={location === item.href}
                  sx={{
                    mb: 1,
                    ...(location === item.href && {
                      color: 'white',
                      backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
                    }),
                  }}
                >
                  <ListItemIcon>
                    <FeatherIcon
                      style={{
                        color: `${location === item.href ? 'white' : ''} `,
                      }}
                      icon={item.icon}
                      width="20"
                      height="20"
                    />
                  </ListItemIcon>

                  <ListItemText onClick={onSidebarClose}>{item.title}</ListItemText>
                </ListItem>
              </NextLink>
            </List>
          ))}
        </List>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: '265px',
            border: '0 !important',
            boxShadow: '0px 7px 30px 0px rgb(113 122 131 / 11%)',
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: '265px',
          border: '0 !important',
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;