import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Expense } from 'src/interfaces/Expense';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  onAddHandler: () => void;
  editMode?: boolean;
  currentValues?: Expense;
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

const AddEditExpenseDialog: React.FC<DialogProps> = ({ onClose, open, onAddHandler, editMode, currentValues }) => {
  const {
    date: currentDate,
    category: currentCategory,
    description: currentDescription,
    amount: currentAmount,
  } = currentValues || {};
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<number>();

  useEffect(() => {
    setDate(currentDate ? new Date(currentDate) : new Date());
    setCategory(currentCategory || '');
    setDescription(currentDescription || '');
    setAmount(currentAmount || 0);
  }, [currentValues]);

  return (
    <BaseDialog
      onClose={onClose}
      title={`${editMode ? 'Edit' : 'Add'} Expense`}
      open={open}
      acceptButtonHandler={onAddHandler}
      cancelButton={false}
      acceptButtonText={editMode ? 'Edit' : 'Add'}
      buttonsSize="large"
    >
      <Stack spacing={3}>
        <Box display="flex" columnGap={2} marginTop={1}>
          <TextField
            id="amount-basic"
            label="Amount*"
            variant="outlined"
            type="number"
            value={amount}
            onChange={({ target: { value } }) => {
              setAmount(+value);
            }}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date*"
              value={date}
              onChange={(newDate) => {
                setDate(newDate || new Date());
              }}
              renderInput={(params) => <TextField size="medium" {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <TextField
          value={category}
          onChange={({ target: { value } }) => {
            setCategory(value);
          }}
          id="category-basic"
          select
          label="Category*"
          variant="outlined"
        >
          {categories.map(({ value, name }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={description}
          onChange={({ target: { value } }) => {
            setDescription(value);
          }}
          id="description-multiline-static"
          label="Description*"
          multiline
          rows={4}
        />
      </Stack>
    </BaseDialog>
  );
};

export default AddEditExpenseDialog;
