import { useState } from 'react';
import { Box, Stack, TextField, ImageList, ImageListItem } from '@mui/material';
import BaseDialog from 'src/components/baseDialog/BaseDialog';
import { Category } from 'src/interfaces/Category';
import { editCategory } from 'src/services/categories.service';
import { toast } from 'react-toastify';
import Image from 'next/image';
import categoryImages from '../CategoryImages';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  categoryToEdit: Category;
  fetchCategories: () => void;
}

const EditCategoryDialog: React.FC<DialogProps> = ({ onClose, open, categoryToEdit, fetchCategories }) => {
  const {
    name: currentName,
    monthlySpendingLimit: currentMonthlySpendingLimit,
    image: currentImage,
    description: currentDescription,
    id: categoryId,
  } = categoryToEdit;
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const [monthlySpendingLimit, setMonthlySpendingLimit] = useState(currentMonthlySpendingLimit);
  const [image, setImage] = useState<string>(currentImage);

  const onEditCategoryHandler = (): void => {
    if (name && description) {
      editCategory({ categoryId, newValues: { description, name, monthlySpendingLimit, image } })
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
      title="Edit Category"
      open={open}
      acceptButtonHandler={onEditCategoryHandler}
      cancelButton={false}
      acceptButtonText="Confirm"
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
        <ImageList cols={4} rowHeight={90}>
          {categoryImages.map(({ src, name: imageName }) => (
            <ImageListItem key={imageName} style={{ border: `${imageName === image ? '5px solid blue' : ''}` }}>
              <Image src={src} alt={imageName} width={80} height={80} onClick={() => onChangeImageHandler(imageName)} />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
    </BaseDialog>
  );
};

export default EditCategoryDialog;
