import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Category } from 'src/interfaces/Category';
import { deleteCategory } from 'src/services/categories.service';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  category: Category;
  fetchCategories: () => void;
}

const DeleteCategoryDialog: React.FC<DialogProps> = ({ onClose, open, category, fetchCategories }) => {
  const { id: categoryId } = category;

  const onDeleteExpenseHandler = (): void => {
    deleteCategory({ categoryId })
      .then(({ message }) => {
        toast.success(message);
        onClose();
        fetchCategories();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <BaseDialog onClose={onClose} title="Delete Category" open={open} acceptButtonHandler={onDeleteExpenseHandler}>
      <Typography marginY={2} textAlign="center">
        Are you sure you want to delete this category?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteCategoryDialog;
