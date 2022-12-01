import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Category } from 'src/interfaces/Category';
import { Income } from 'src/interfaces/Income';
import { getCategories } from 'src/services/categories.service';
import { editIncome } from 'src/services/incomes.service';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  incomeToEdit: Income;
  fetchIncomes: () => void;
}

const EditIncomeDialog: React.FC<DialogProps> = ({ onClose, open, incomeToEdit, fetchIncomes }) => {
  const {
    date: currentDate,
    category: currentCategory,
    description: currentDescription,
    amount: currentAmount,
    id: incomeId,
  } = incomeToEdit;
  const [date, setDate] = useState<Date>(currentDate);
  const [category, setCategory] = useState<number>(currentCategory.id);
  const [description, setDescription] = useState<string>(currentDescription);
  const [amount, setAmount] = useState<number>(+currentAmount);
  const [categories, setCategories] = useState<Category[]>([]);

  const onEditIncomeHandler = (): void => {
    if (date && category && description && amount) {
      editIncome({ incomeId, newValues: { categoryId: category, amount, date, description } })
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
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <BaseDialog
      onClose={onClose}
      title="Edit Income"
      open={open}
      acceptButtonHandler={onEditIncomeHandler}
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
            InputProps={{ inputProps: { min: 1 } }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date*"
              value={date}
              onChange={(newDate) => {
                setDate(newDate || new Date());
              }}
              maxDate={new Date()}
              inputFormat="dd/MM/yyyy"
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

export default EditIncomeDialog;
