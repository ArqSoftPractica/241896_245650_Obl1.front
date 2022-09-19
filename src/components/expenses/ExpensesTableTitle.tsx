import React from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FeatherIcon from 'feather-icons-react';

const ExpensesTableTitle: React.FC<Record<string, never>> = () => {
  return (
    <Box p={2} display="flex" alignItems="center" justifyContent="space-between" marginY={1}>
      <Box display="flex">
        <Typography variant="h2">Expenses</Typography>
        <Box display="flex" alignItems="center" columnGap={1} marginLeft={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From"
              value="2022-05-24"
              // onChange={() => {
              //   return;
              // }}
              renderInput={(params) => <TextField style={{ width: '150px' }} size="small" {...params} />}
            />
          </LocalizationProvider>
          -
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To"
              value="2022-05-26"
              // onChange={() => {
              //   return;
              // }}
              renderInput={(params) => <TextField style={{ width: '150px' }} size="small" {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Button variant="outlined" color="success">
        <FeatherIcon icon="plus" width="20" height="20" style={{ marginRight: '10px' }} />
        Add Expense
      </Button>
    </Box>
  );
};

export default ExpensesTableTitle;
