import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Category } from 'src/interfaces/Category';
import { Expense } from 'src/interfaces/Expense';
import { getCategories } from 'src/services/categories.service';
import { editExpense } from 'src/services/expenses.service';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  expenseToEdit: Expense;
  fetchExpenses: () => void;
}

const EditExpenseDialog: React.FC<DialogProps> = ({ onClose, open, expenseToEdit, fetchExpenses }) => {
  const {
    date: currentDate,
    category: currentCategory,
    description: currentDescription,
    amount: currentAmount,
    id: expenseId,
  } = expenseToEdit;
  const [date, setDate] = useState<Date>(currentDate);
  const [category, setCategory] = useState<number>(currentCategory.id);
  const [description, setDescription] = useState<string>(currentDescription);
  const [amount, setAmount] = useState<number>(currentAmount);
  const [categories, setCategories] = useState<Category[]>([]);

  const onEditExpenseHandler = (): void => {
    if (date && category && description && amount) {
      editExpense({ expenseId, newValues: { categoryId: category, amount, date, description } })
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
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <BaseDialog
      onClose={onClose}
      title="Edit Expense"
      open={open}
      acceptButtonHandler={onEditExpenseHandler}
      cancelButton={false}
      acceptButtonText="Confirm"
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
            InputProps={{ inputProps: { min: 0 } }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date*"
              value={date}
              onChange={(newDate) => {
                setDate(newDate || new Date());
              }}
              maxDate={new Date()}
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

export default EditExpenseDialog;
