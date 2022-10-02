import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Expense } from 'src/interfaces/Expense';
import { deleteExpense } from 'src/services/expenses.service';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  expense: Expense;
  fetchExpenses: () => void;
}

const DeleteExpenseDialog: React.FC<DialogProps> = ({ onClose, open, expense, fetchExpenses }) => {
  const { id: expenseId } = expense;

  const onDeleteExpenseHandler = (): void => {
    deleteExpense({ expenseId })
      .then(({ message }) => {
        toast.success(message);
        onClose();
        fetchExpenses();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <BaseDialog onClose={onClose} title="Delete Expense" open={open} acceptButtonHandler={onDeleteExpenseHandler}>
      <Typography marginY={2} textAlign="center">
        Are you sure you want to delete this expense?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteExpenseDialog;
