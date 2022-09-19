import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

const CategoriesTableTitle: React.FC<Record<string, never>> = () => {
  return (
    <Box p={2} display="flex" alignItems="center" justifyContent="space-between" marginY={1}>
      <Box display="flex">
        <Typography variant="h2">Categories</Typography>
      </Box>
      <Button variant="outlined" color="success">
        <FeatherIcon icon="plus" width="20" height="20" style={{ marginRight: '10px' }} />
        Add Category
      </Button>
    </Box>
  );
};

export default CategoriesTableTitle;
