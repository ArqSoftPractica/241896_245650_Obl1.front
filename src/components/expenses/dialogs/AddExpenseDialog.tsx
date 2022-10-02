import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Category } from 'src/interfaces/Category';
import { getCategories } from 'src/services/categories.service';
import { addExpense } from 'src/services/expenses.service';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  fetchExpenses: () => void;
}

const AddExpenseDialog: React.FC<DialogProps> = ({ onClose, open, fetchExpenses }) => {
  const [date, setDate] = useState<Date>(() => new Date());
  const [category, setCategory] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const onAddExpenseHandler = (): void => {
    if (date && category && description && amount) {
      addExpense({ categoryId: category, amount, date, description })
        .then(({ message }) => {
          toast.success(message);
          onClose();
          fetchExpenses();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  useEffect(() => {
    getCategories({})
      .then(({ categories: categoriesFetched }) => {
        setCategories(categoriesFetched);
        setCategory(categoriesFetched[0]?.id);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <BaseDialog
      onClose={onClose}
      title="Add Expense"
      open={open}
      acceptButtonHandler={onAddExpenseHandler}
      cancelButton={false}
      acceptButtonText="Add"
      buttonsSize="large"
      acceptButtonDisabled={!date || !category || !description || !amount}
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
            InputProps={{ inputProps: { min: 1 } }}
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
        {category && categories.length > 0 && (
          <TextField
            value={category}
            onChange={({ target: { value } }) => {
              setCategory(+value);
            }}
            id="category-basic"
            select
            label="Category*"
            variant="outlined"
          >
            {categories.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        )}
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

export default AddExpenseDialog;
