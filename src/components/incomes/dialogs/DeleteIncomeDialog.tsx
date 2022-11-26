import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Income } from 'src/interfaces/Income';
import { deleteIncome } from 'src/services/incomes.service';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  income: Income;
  fetchIncomes: () => void;
}

const DeleteIncomeDialog: React.FC<DialogProps> = ({ onClose, open, income, fetchIncomes }) => {
  const { id: incomeId } = income;

  const onDeleteIncomeHandler = (): void => {
    deleteIncome({ incomeId })
      .then(({ message }) => {
        toast.success(message);
        onClose();
        fetchIncomes();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <BaseDialog onClose={onClose} title="Delete Income" open={open} acceptButtonHandler={onDeleteIncomeHandler}>
      <Typography marginY={2} textAlign="center">
        Are you sure you want to delete this income?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteIncomeDialog;
