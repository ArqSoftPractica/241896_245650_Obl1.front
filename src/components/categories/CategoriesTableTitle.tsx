import React, { Dispatch, SetStateAction } from 'react';
import { Typography, Box, Button } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

export interface Props {
  setIsAddCategoryDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoriesTableTitle: React.FC<Props> = ({ setIsAddCategoryDialogOpen }) => {
  return (
    <Box p={2} display="flex" alignItems="center" justifyContent="space-between" marginY={1}>
      <Box display="flex">
        <Typography variant="h2">Categories</Typography>
      </Box>
      <Button variant="outlined" color="success" onClick={() => setIsAddCategoryDialogOpen(true)}>
        <FeatherIcon icon="plus" width="20" height="20" style={{ marginRight: '10px' }} />
        Add Category
      </Button>
    </Box>
  );
};

export default CategoriesTableTitle;
