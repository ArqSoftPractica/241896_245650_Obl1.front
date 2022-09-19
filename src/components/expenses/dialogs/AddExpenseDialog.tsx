import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import BaseDialog from 'src/components/baseDialog/BaseDialog';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  onAddHandler: () => void;
}

const categories = [
  {
    value: 'Entertainment',
    name: 'Entertainment',
  },
  {
    value: 'Food',
    name: 'Food',
  },
  {
    value: 'Transportation',
    name: 'Transportation',
  },
  {
    value: 'Shopping',
    name: 'Shopping',
  },
];

const AddExpenseDialog: React.FC<DialogProps> = ({ onClose, open, onAddHandler }) => {
  return (
    <BaseDialog
      onClose={onClose}
      title="Add Expense"
      open={open}
      acceptButtonHandler={onAddHandler}
      cancelButton={false}
      acceptButtonText="Add"
      buttonsSize="large"
    >
      <Stack spacing={3}>
        <Box display="flex" columnGap={2} marginTop={3}>
          <TextField
            id="amount-basic"
            label="Amount"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value="2022-05-24"
              // onChange={() => {
              //   return;
              // }}
              renderInput={(params) => <TextField size="medium" {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <TextField id="category-basic" select label="Category" variant="outlined">
          {categories.map(({ value, name }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="description-multiline-static" label="Description" multiline rows={4} />
      </Stack>
    </BaseDialog>
  );
};

export default AddExpenseDialog;
