import { useState } from 'react';
import Image from 'next/image';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Box,
  IconButton,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { Category } from 'src/interfaces/Category';
import BaseCard from '../../baseCard/BaseCard';
import CategoriesTableTitle from './CategoriesTableTitle';
import DeleteCategoryDialog from './dialogs/DeleteCategoryDialog';
import AddEditCategoryDialog from './dialogs/AddEditCategoryDialog';

const categories: Category[] = [
  {
    id: 1,
    description: 'Movie',
    monthlySpendingLimit: 213123,
    name: 'Entertainment',
    image: 'entertainment',
  },
  {
    id: 2,
    description: 'Burgers & Fries',
    monthlySpendingLimit: 2123,
    name: 'Food',
    image: 'food',
  },
];

const categoriesTableColumns = ['Name', 'Description', 'Image', 'Monthly Spending Limit', ''];

const CategoriesTable: React.FC<Record<string, never>> = () => {
  const [isDeleteCategoryDialogOpen, setIsDeleteCategoryDialogOpen] = useState<boolean>(false);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState<boolean>(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState<boolean>(false);
  const [editedCategory, setEditedCategory] = useState<Category>();

  const onAddCategoryHandler = (): void => {
    console.log('added');
    console.log('reloads categories');
    setIsAddCategoryDialogOpen(false);
  };

  const onDeleteCategoryHandler = (): void => {
    console.log('deleted');
    console.log('reloads categories');
    setIsDeleteCategoryDialogOpen(false);
  };

  const onEditCategoryHandler = (): void => {
    console.log('edited');
    console.log('reloads expenses');
    setIsEditCategoryDialogOpen(false);
  };

  const onEditCategoryClickHandler = (category: Category): void => {
    console.log('opens edit category dialog');
    setEditedCategory(category);
    setIsEditCategoryDialogOpen(true);
  };

  return (
    <BaseCard>
      <CategoriesTableTitle setIsAddCategoryDialogOpen={setIsAddCategoryDialogOpen} />
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: 'nowrap',
          marginTop: '20px',
        }}
      >
        <TableHead>
          <TableRow>
            {categoriesTableColumns.map((column) => (
              <TableCell key={column}>
                <Typography color="textPrimary" variant="h6">
                  {column}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length > 0 &&
            categories.map(({ id, name, description, image, monthlySpendingLimit }) => (
              <TableRow key={id}>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {description}
                  </Typography>
                </TableCell>
                <TableCell>{/* <Image src={image} alt="Family" width={50} height={50} /> */}</TableCell>
                <TableCell style={{ width: '60px' }}>
                  <Typography color="textSecondary" variant="h6">
                    {monthlySpendingLimit}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: '20px' }}>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() =>
                      onEditCategoryClickHandler({
                        id,
                        name,
                        description,
                        image,
                        monthlySpendingLimit,
                      })
                    }
                  >
                    <FeatherIcon icon="edit" width="20" height="20" />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={() => setIsDeleteCategoryDialogOpen(true)}>
                    <FeatherIcon icon="trash" width="20" height="20" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box sx={{ paddingTop: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={8} color="secondary" />
      </Box>
      <AddEditCategoryDialog
        open={isAddCategoryDialogOpen}
        onClose={() => setIsAddCategoryDialogOpen(false)}
        onAddHandler={onAddCategoryHandler}
      />
      <AddEditCategoryDialog
        open={isEditCategoryDialogOpen}
        editMode
        onClose={() => setIsEditCategoryDialogOpen(false)}
        onAddHandler={onEditCategoryHandler}
        currentValues={editedCategory}
      />
      <DeleteCategoryDialog
        open={isDeleteCategoryDialogOpen}
        onClose={() => setIsDeleteCategoryDialogOpen(false)}
        onDeleteHandler={onDeleteCategoryHandler}
      />
    </BaseCard>
  );
};

export default CategoriesTable;
