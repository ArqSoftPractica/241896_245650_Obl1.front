import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Chip } from '@mui/material';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import FeatherIcon from 'feather-icons-react';
import { Category } from 'src/interfaces/Category';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  onAddHandler: () => void;
  editMode?: boolean;
  currentValues?: Category;
}

const AddEditCategoryDialog: React.FC<DialogProps> = ({ onClose, open, onAddHandler, editMode, currentValues }) => {
  const {
    name: currentName,
    monthlySpendingLimit: currentMonthlySpendingLimit,
    image: currentImage,
    description: currentDescription,
  } = currentValues || {};
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [monthlySpendingLimit, setMonthlySpendingLimit] = useState(0);
  const [image, setImage] = useState<File | null>();

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files }: { files: FileList | null } = event.target;
    if (files) {
      const fileToUpload = files[0];
      setImage(fileToUpload);
    }
  };

  const handleDeleteImage = () => {
    setImage(undefined);
  };

  useEffect(() => {
    setImage(currentImage);
    setName(currentName || '');
    setDescription(currentDescription || '');
    setMonthlySpendingLimit(currentMonthlySpendingLimit || 0);
  }, [currentValues]);

  return (
    <BaseDialog
      onClose={onClose}
      title={`${editMode ? 'Edit' : 'Add'} Category`}
      open={open}
      acceptButtonHandler={onAddHandler}
      cancelButton={false}
      acceptButtonText={editMode ? 'Confirm' : 'Add'}
      buttonsSize="large"
      size="sm"
    >
      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between" columnGap={2} marginTop={1}>
          <TextField
            id="name-basic"
            label="Name*"
            variant="outlined"
            fullWidth
            value={name}
            onChange={({ target: { value } }) => {
              setName(value);
            }}
          />
          <TextField
            id="limit-basic"
            label="Monthly Spending Limit"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={monthlySpendingLimit}
            onChange={({ target: { value } }) => {
              setMonthlySpendingLimit(+value);
            }}
            fullWidth
          />
        </Box>
        <TextField
          id="description-multiline-static"
          label="Description*"
          multiline
          rows={4}
          value={description}
          onChange={({ target: { value } }) => {
            setDescription(value);
          }}
        />
        <Box display="flex" justifyContent="left" columnGap={2} marginTop={1} style={{ cursor: 'pointer' }}>
          {image ? (
            <Chip variant="outlined" label={image.name} size="medium" onDelete={handleDeleteImage} />
          ) : (
            <Button color="primary">
              <label htmlFor="file-input" style={{ display: 'flex', alignItems: 'center' }}>
                <FeatherIcon icon="plus" width="15" height="15" style={{ marginRight: '5px' }} />
                Add Image
                <input
                  type="file"
                  id="file-input"
                  style={{ display: 'none' }}
                  accept=".png, .jpg, .jpeg"
                  onInput={handleUpload}
                />
              </label>
            </Button>
          )}
        </Box>
      </Stack>
    </BaseDialog>
  );
};

export default AddEditCategoryDialog;
