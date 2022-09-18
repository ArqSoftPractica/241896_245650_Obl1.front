import React from 'react';

import { Card, CardContent, Box, Typography } from '@mui/material';

const BaseCard = (props) => {
  const { title, children, ...rest } = props;

  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{title}</Typography>
      </Box>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
