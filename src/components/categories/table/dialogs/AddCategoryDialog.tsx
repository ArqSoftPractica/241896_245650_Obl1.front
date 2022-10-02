import { useState } from 'react';
import { Box, ImageList, ImageListItem, Stack, TextField } from '@mui/material';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { addCategory } from 'src/services/categories.service';
import { toast } from 'react-toastify';
import Image from 'next/image';
import categoryImages from '../CategoryImages';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  fetchCategories: () => void;
}

const AddCategoryDialog: React.FC<DialogProps> = ({ onClose, open, fetchCategories }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [monthlySpendingLimit, setMonthlySpendingLimit] = useState(0);
  const [image, setImage] = useState<string>('');

  const onAddCategoryHandler = (): void => {
    if (name && description) {
      addCategory({ name, description, monthlySpendingLimit, image })
        .then(({ message }) => {
          toast.success(message);
          onClose();
          fetchCategories();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const onChangeImageHandler = (imageChosen: string): void => {
    setImage((prevImage) => (prevImage === imageChosen ? '' : imageChosen));
  };

  return (
    <BaseDialog
      onClose={onClose}
      title="Add Category"
      open={open}
      acceptButtonHandler={onAddCategoryHandler}
      cancelButton={false}
      acceptButtonText="Add"
      buttonsSize="large"
      size="sm"
      acceptButtonDisabled={!name || !description}
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
        <ImageList cols={4} rowHeight={90} gap={13}>
          {categoryImages.map(({ src, name: imageName }) => (
            <ImageListItem key={imageName} style={{ border: `${imageName === image ? '5px solid blue' : ''}` }}>
              <Image src={src} alt={imageName} width={60} height={80} onClick={() => onChangeImageHandler(imageName)} />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
    </BaseDialog>
  );
};

export default AddCategoryDialog;
