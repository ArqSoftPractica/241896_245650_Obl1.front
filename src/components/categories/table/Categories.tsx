import { useCallback, useEffect, useMemo, useState } from 'react';
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
  Switch,
  Tooltip,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { Category } from 'src/interfaces/Category';
import { getCategories } from 'src/services/categories.service';
import { toast } from 'react-toastify';
import useUser from 'hooks/useUser';
import { subscribeToAlertsOfOneCategory, unsubscribeToAlertsOfOneCategory } from 'src/services/alerts.service';
import {
  subscribeToNotificationsOfOneCategory,
  unsubscribeToNotificationsOfOneCategory,
} from 'src/services/notifications.service';
import BaseCard from '../../baseCard/BaseCard';
import CategoriesTableTitle from './CategoriesTableTitle';
import DeleteCategoryDialog from './dialogs/DeleteCategoryDialog';
import AddCategoryDialog from './dialogs/AddCategoryDialog';
import EditCategoryDialog from './dialogs/EditCategoryDialog';
import { getCategoryImagePath } from './CategoryImages';

const categoriesTableColumns = [
  {
    id: 'name',
    label: 'Name',
    roles: ['admin', 'user'],
  },
  {
    id: 'description',
    label: 'Description',
    roles: ['admin', 'user'],
  },
  {
    id: 'image',
    label: 'Image',
    roles: ['admin', 'user'],
  },
  {
    id: 'monthly-spending-limit',
    label: 'Monthly Spending Limit',
    roles: ['admin', 'user'],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    infoTooltipText: 'If enabled, you will receive a notification when an income or expense is added to this category',
    roles: ['admin'],
  },
  {
    id: 'alerts',
    label: 'Alerts',
    infoTooltipText: 'If enabled, you will receive an alert when you reach the monthly spending limit',
    roles: ['admin', 'user'],
  },
  {
    id: 'actions',
    label: '',
    roles: ['admin'],
  },
];

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
        setQuantityOfPages(Math.max(1, Math.ceil(totalCategories / CATEGORIES_PER_PAGE)));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, [page, fetchCategories]);

  useEffect(() => {
    setPage((prevPage) => {
      if (prevPage > quantityOfPages) {
        return quantityOfPages;
      }
      return prevPage;
    });
  }, [quantityOfPages]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const subscribeToAlertsOfOneCategoryHandler = (categoryId: number): void => {
    subscribeToAlertsOfOneCategory({ categoryId })
      .then(({ message }) => {
        toast.success(message);
        fetchCategories();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const unsubscribeToAlertsOfOneCategoryHandler = (categoryId: number): void => {
    unsubscribeToAlertsOfOneCategory({ categoryId })
      .then(({ message }) => {
        toast.success(message);
        fetchCategories();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleAlertsChange = (event: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
    const {
      target: { checked },
    } = event;
    if (checked) {
      subscribeToAlertsOfOneCategoryHandler(categoryId);
    } else {
      unsubscribeToAlertsOfOneCategoryHandler(categoryId);
    }
  };

  const subscribeToNotificationsOfOneCategoryHandler = (categoryId: number): void => {
    subscribeToNotificationsOfOneCategory({ categoryId })
      .then(({ message }) => {
        toast.success(message);
        fetchCategories();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const unsubscribeToNotificationsOfOneCategoryHandler = (categoryId: number): void => {
    unsubscribeToNotificationsOfOneCategory({ categoryId })
      .then(({ message }) => {
        toast.success(message);
        fetchCategories();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
    const {
      target: { checked },
    } = event;
    if (checked) {
      subscribeToNotificationsOfOneCategoryHandler(categoryId);
    } else {
      unsubscribeToNotificationsOfOneCategoryHandler(categoryId);
    }
  };

  const allowedRoles = useMemo(() => ['admin', 'user'], []);

  const { user } = useUser({ redirectTo: '/', allowedRoles });

  if (!user) {
    return <div>Loading...</div>;
  }

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
            {categoriesTableColumns.map(({ id, label, infoTooltipText, roles }) => {
              return roles.includes(user.role) ? (
                <TableCell key={id}>
                  <Box display="flex" alignItems="center">
                    <Typography color="textPrimary" variant="h6">
                      {label}
                    </Typography>
                    {infoTooltipText && (
                      <Tooltip title={infoTooltipText} arrow>
                        <IconButton aria-label="edit" color="primary">
                          <FeatherIcon
                            icon="info"
                            width="12"
                            height="12"
                            style={{ color: 'blue', position: 'absolute', bottom: '4px', left: '3px' }}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              ) : null;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length > 0 &&
            categories.map(
              ({
                id,
                name,
                description,
                image,
                monthlySpendingLimit,
                hasAlertsActivated,
                hasNotificationsActivated,
              }) => (
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
                  {user.role === 'admin' && (
                    <TableCell style={{ width: '30px' }}>
                      <Switch
                        checked={hasNotificationsActivated}
                        onChange={(event) => handleNotificationsChange(event, id)}
                      />
                    </TableCell>
                  )}
                  <TableCell style={{ width: '30px' }}>
                    <Switch checked={hasAlertsActivated} onChange={(event) => handleAlertsChange(event, id)} />
                  </TableCell>
                  {user.role === 'admin' && (
                    <TableCell style={{ width: '20px' }}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() =>
                          onEditCategoryClickHandler({
                            id,
                            name,
                            description,
                            image,
                            monthlySpendingLimit,
                            hasAlertsActivated,
                            hasNotificationsActivated,
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
                            hasAlertsActivated,
                            hasNotificationsActivated,
                          })
                        }
                      >
                        <FeatherIcon icon="trash" width="20" height="20" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ),
            )}
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
