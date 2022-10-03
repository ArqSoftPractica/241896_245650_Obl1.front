import React, { Dispatch, SetStateAction, useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FeatherIcon from 'feather-icons-react';

export interface Props {
  setIsAddExpenseDialogOpen: Dispatch<SetStateAction<boolean>>;
  fromDate: Date;
  toDate: Date;
  handleFromDateChange: (date: Date | null) => void;
  handleToDateChange: (date: Date | null) => void;
}

const ExpensesTableTitle: React.FC<Props> = ({
  setIsAddExpenseDialogOpen,
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
}) => {
  const [maxToDate] = useState<Date>(() => {
    const todayDate = new Date();
    return new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 23, 59, 59);
  });

  return (
    <Box p={2} display="flex" alignItems="center" justifyContent="space-between" marginY={1}>
      <Box display="flex">
        <Typography variant="h2">Expenses</Typography>
        <Box display="flex" alignItems="center" columnGap={1} marginLeft={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From"
              value={fromDate}
              onChange={handleFromDateChange}
              maxDate={toDate}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField style={{ width: '150px' }} size="small" {...params} />}
            />
          </LocalizationProvider>
          -
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To"
              value={toDate}
              onChange={handleToDateChange}
              minDate={fromDate}
              maxDate={maxToDate}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField style={{ width: '150px' }} size="small" {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Button variant="outlined" color="success" onClick={() => setIsAddExpenseDialogOpen(true)}>
        <FeatherIcon icon="plus" width="20" height="20" style={{ marginRight: '10px' }} />
        Add Expense
      </Button>
    </Box>
  );
};

export default ExpensesTableTitle;
