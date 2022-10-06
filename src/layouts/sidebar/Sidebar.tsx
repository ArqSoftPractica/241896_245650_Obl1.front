import React, { useMemo } from 'react';
import NextLink from 'next/link';
import { Box, Drawer, useMediaQuery, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import LogoIcon from '../logo/LogoIcon';
import Menuitems from './MenuItems';
import GrowthBanner from './GrowthBanner';

interface Props {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const allowedRoles = useMemo(() => ['admin', 'user'], []);

  const { user } = useUser({ redirectTo: '/', allowedRoles });

  const curl = useRouter();
  const location = curl.pathname;

  if (!user) {
    return <div>Loading...</div>;
  }

  const SidebarContent = (
    <Box p={2} height="100%">
      <LogoIcon />
      <Box mt={2}>
        <List>
          {Menuitems.map(({ title, icon, href, roles }) => (
            <List component="li" disablePadding key={title}>
              {roles.includes(user.role) && (
                <NextLink href={href}>
                  <ListItem
                    button
                    selected={location === href}
                    sx={{
                      mb: 1,
                      ...(location === href && {
                        color: 'white',
                        backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon>
                      <FeatherIcon
                        style={{
                          color: `${location === href ? 'white' : ''} `,
                        }}
                        icon={icon}
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>

                    <ListItemText onClick={onSidebarClose}>{title}</ListItemText>
                  </ListItem>
                </NextLink>
              )}
            </List>
          ))}
        </List>
      </Box>
      <GrowthBanner />
    </Box>
  );
  return (
    <Drawer
      anchor="left"
      open={lgUp ? isSidebarOpen : isMobileSidebarOpen}
      variant={lgUp ? 'persistent' : 'temporary'}
      onClose={!lgUp ? undefined : onSidebarClose}
      PaperProps={{
        sx: {
          width: '265px',
          border: '0 !important',
          boxShadow: `${lgUp ? '0px 7px 30px 0px rgb(113 122 131 / 11%)' : ''}`,
        },
      }}
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
