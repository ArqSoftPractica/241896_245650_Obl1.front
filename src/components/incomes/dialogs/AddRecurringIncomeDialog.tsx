import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Category } from 'src/interfaces/Category';
import { getCategories } from 'src/services/categories.service';
import { addRecurringTransaction } from 'src/services/recurring-transactions.service';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  fetchIncomes: () => void;
}

const AddRecurringIncomeDialog: React.FC<DialogProps> = ({ onClose, open, fetchIncomes }) => {
  const [category, setCategory] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const onAddIncomeHandler = (): void => {
    if (category && description && amount) {
      addRecurringTransaction({ categoryId: category, amount, description, type: 'income' })
        .then(({ message }) => {
          toast.success(message);
          onClose();
          fetchIncomes();
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
      title="Add Recurring Income"
      open={open}
      acceptButtonHandler={onAddIncomeHandler}
      cancelButton={false}
      acceptButtonText="Add"
      buttonsSize="large"
      acceptButtonDisabled={!category || !description || !amount}
    >
      <Stack spacing={3}>
        <Typography textAlign="center">Recurring incomes will be added on the first day of each month.</Typography>
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

export default AddRecurringIncomeDialog;
