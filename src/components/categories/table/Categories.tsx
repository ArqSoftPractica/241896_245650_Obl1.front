import { useCallback, useEffect, useState } from 'react';
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
import { getCategories } from 'src/services/categories.service';
import { toast } from 'react-toastify';
import BaseCard from '../../baseCard/BaseCard';
import CategoriesTableTitle from './CategoriesTableTitle';
import DeleteCategoryDialog from './dialogs/DeleteCategoryDialog';
import AddCategoryDialog from './dialogs/AddCategoryDialog';
import EditCategoryDialog from './dialogs/EditCategoryDialog';
import { getCategoryImagePath } from './CategoryImages';

const categoriesTableColumns = ['Name', 'Description', 'Image', 'Monthly Spending Limit', ''];

const CATEGORIES_PER_PAGE = 3;

const Categories: React.FC<Record<string, never>> = () => {
  const [isDeleteCategoryDialogOpen, setIsDeleteCategoryDialogOpen] = useState<boolean>(false);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState<boolean>(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [quantityOfPages, setQuantityOfPages] = useState<number>(1);

  const onEditCategoryClickHandler = (category: Category): void => {
    setSelectedCategory(category);
    setIsEditCategoryDialogOpen(true);
  };

  const onDeleteCategoryClickHandler = (category: Category): void => {
    setSelectedCategory(category);
    setIsDeleteCategoryDialogOpen(true);
  };

  const onCloseDeleteCategoryDialogHandler = (): void => {
    setIsDeleteCategoryDialogOpen(false);
    setSelectedCategory(undefined);
  };

  const onCloseEditExpenseDialogHandler = (): void => {
    setIsEditCategoryDialogOpen(false);
    setSelectedCategory(undefined);
  };

  const fetchCategories = useCallback(() => {
    getCategories({ take: CATEGORIES_PER_PAGE, skip: (page - 1) * CATEGORIES_PER_PAGE })
      .then(({ categories: categoriesObtained, totalCategories }) => {
        setCategories([...categoriesObtained]);
        setQuantityOfPages(Math.ceil(totalCategories / CATEGORIES_PER_PAGE));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, [page, fetchCategories]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
                <TableCell>
                  {getCategoryImagePath(image) && (
                    <Image src={getCategoryImagePath(image)} alt="Family" width={90} height={90} loading="lazy" />
                  )}
                </TableCell>
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
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() =>
                      onDeleteCategoryClickHandler({
                        id,
                        name,
                        description,
                        image,
                        monthlySpendingLimit,
                      })
                    }
                  >
                    <FeatherIcon icon="trash" width="20" height="20" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box sx={{ paddingTop: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={quantityOfPages} page={page} color="secondary" onChange={handlePageChange} />
      </Box>
      {isAddCategoryDialogOpen && (
        <AddCategoryDialog
          open={isAddCategoryDialogOpen}
          onClose={() => setIsAddCategoryDialogOpen(false)}
          fetchCategories={fetchCategories}
        />
      )}
      {selectedCategory && (
        <>
          <DeleteCategoryDialog
            open={isDeleteCategoryDialogOpen}
            onClose={onCloseDeleteCategoryDialogHandler}
            fetchCategories={fetchCategories}
            category={selectedCategory}
          />
          <EditCategoryDialog
            open={isEditCategoryDialogOpen}
            onClose={onCloseEditExpenseDialogHandler}
            categoryToEdit={selectedCategory}
            fetchCategories={fetchCategories}
          />
        </>
      )}
    </BaseCard>
  );
};

export default Categories;
