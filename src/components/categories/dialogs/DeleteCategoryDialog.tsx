import { Typography } from '@mui/material';
import BaseDialog from 'src/components/baseDialog/BaseDialog';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  onDeleteHandler: () => void;
}

const DeleteCategoryDialog: React.FC<DialogProps> = ({ onClose, open, onDeleteHandler }) => {
  return (
    <BaseDialog onClose={onClose} title="Delete Category" open={open} acceptButtonHandler={onDeleteHandler}>
      <Typography marginY={2}>Are you sure you want to delete this category?</Typography>
    </BaseDialog>
  );
};

export default DeleteCategoryDialog;
