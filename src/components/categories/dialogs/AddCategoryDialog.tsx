import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import BaseDialog from 'src/components/baseDialog/BaseDialog';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  onAddHandler: () => void;
}

const AddCategoryDialog: React.FC<DialogProps> = ({ onClose, open, onAddHandler }) => {
  return (
    <BaseDialog
      onClose={onClose}
      title="Add Category"
      open={open}
      acceptButtonHandler={onAddHandler}
      cancelButton={false}
      acceptButtonText="Add"
      buttonsSize="large"
      size="sm"
    >
      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between" columnGap={2} marginTop={1}>
          <TextField id="name-basic" label="Name*" variant="outlined" fullWidth />
          <TextField
            id="limit-basic"
            label="Monthly Spending Limit"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
          />
        </Box>
        <TextField id="description-multiline-static" label="Description*" multiline rows={4} />
      </Stack>
    </BaseDialog>
  );
};

export default AddCategoryDialog;
