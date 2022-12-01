import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Typography, Box, Button } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import useUser from 'hooks/useUser';

export interface Props {
  setIsAddCategoryDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoriesTableTitle: React.FC<Props> = ({ setIsAddCategoryDialogOpen }) => {
  const allowedRoles = useMemo(() => ['admin', 'user'], []);

  const { user } = useUser({ redirectTo: '/', allowedRoles });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={2} display="flex" alignItems="center" justifyContent="space-between" marginY={1}>
      <Box display="flex">
        <Typography variant="h2">Categories</Typography>
      </Box>
      {user.role === 'admin' && (
        <Button variant="outlined" color="success" onClick={() => setIsAddCategoryDialogOpen(true)}>
          <FeatherIcon icon="plus" width="20" height="20" style={{ marginRight: '10px' }} />
          Add Category
        </Button>
      )}
    </Box>
  );
};

export default CategoriesTableTitle;
