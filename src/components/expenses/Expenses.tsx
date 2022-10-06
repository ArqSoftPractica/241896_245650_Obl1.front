import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Expense } from 'src/interfaces/Expense';
import { getExpenses } from 'src/services/expenses.service';
import { toast } from 'react-toastify';
import formatDate from 'src/utils/formatDate';
import useUser from 'hooks/useUser';
import BaseCard from '../baseCard/BaseCard';
import ExpensesTableTitle from './ExpensesTableTitle';
import DeleteExpenseDialog from './dialogs/DeleteExpenseDialog';
import EditExpenseDialog from './dialogs/EditExpenseDialog';
import AddExpenseDialog from './dialogs/AddExpenseDialog';

export interface Props {
  fromDate: Date;
  toDate: Date;
  handleFromDateChange: (date: Date | null) => void;
  handleToDateChange: (date: Date | null) => void;
  fetchExpensesPerCategory: () => void;
}

const EXPENSES_PER_PAGE = 4;

const expensesTableColumns = [
  { name: 'Date', roles: ['admin', 'user'] },
  { name: 'Category', roles: ['admin', 'user'] },
  { name: 'Description', roles: ['admin', 'user'] },
  { name: 'Amount', roles: ['admin', 'user'] },
  { name: '', roles: ['admin'] },
];

const Expenses: React.FC<Props> = ({
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
  fetchExpensesPerCategory,
}) => {
  const [isDeleteExpenseDialogOpen, setIsDeleteExpenseDialogOpen] = useState<boolean>(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState<boolean>(false);
  const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [page, setPage] = useState<number>(1);
  const [quantityOfPages, setQuantityOfPages] = useState<number>(1);

  const onEditExpenseClickHandler = (expense: Expense): void => {
    setSelectedExpense(expense);
    setIsEditExpenseDialogOpen(true);
  };

  const onDeleteExpenseClickHandler = (expense: Expense): void => {
    setSelectedExpense(expense);
    setIsDeleteExpenseDialogOpen(true);
  };

  const onCloseDeleteExpenseDialogHandler = (): void => {
    setIsDeleteExpenseDialogOpen(false);
    setSelectedExpense(undefined);
  };

  const onCloseEditExpenseDialogHandler = (): void => {
    setIsEditExpenseDialogOpen(false);
    setSelectedExpense(undefined);
  };

  const fetchExpenses = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('fetchExpenses callback');
    getExpenses({ fromDate, toDate, take: EXPENSES_PER_PAGE, skip: (page - 1) * EXPENSES_PER_PAGE })
      .then(({ expenses: expensesObtained, totalExpenses }) => {
        setExpenses([...expensesObtained]);
        setQuantityOfPages(Math.max(1, Math.ceil(totalExpenses / EXPENSES_PER_PAGE)));
        fetchExpensesPerCategory();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [fromDate, toDate, page, fetchExpensesPerCategory]);

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line no-console
    console.log('fetching expenses');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const allowedRoles = useMemo(() => ['admin', 'user'], []);

  const { user } = useUser({ redirectTo: '/', allowedRoles });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <BaseCard>
      <ExpensesTableTitle
        setIsAddExpenseDialogOpen={setIsAddExpenseDialogOpen}
        fromDate={fromDate}
        toDate={toDate}
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange}
      />
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: 'nowrap',
          marginTop: '20px',
        }}
      >
        <TableHead>
          <TableRow>
            {expensesTableColumns.map(({ name, roles }) => {
              return roles.includes(user.role) ? (
                <TableCell key={name}>
                  <Typography color="textPrimary" variant="h6">
                    {name}
                  </Typography>
                </TableCell>
              ) : null;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length > 0 &&
            expenses.map(({ id, date, category: { id: categoryId, name: categoryName }, description, amount }) => (
              <TableRow key={id}>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {formatDate(date)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {categoryName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {amount}
                  </Typography>
                </TableCell>
                {user.role === 'admin' && (
                  <TableCell style={{ width: '40px' }}>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() =>
                        onEditExpenseClickHandler({
                          id,
                          date,
                          category: { name: categoryName, id: categoryId },
                          description,
                          amount,
                        })
                      }
                    >
                      <FeatherIcon icon="edit" width="20" height="20" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() =>
                        onDeleteExpenseClickHandler({
                          id,
                          date,
                          category: { name: categoryName, id: categoryId },
                          description,
                          amount,
                        })
                      }
                    >
                      <FeatherIcon icon="trash" width="20" height="20" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box sx={{ paddingTop: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={quantityOfPages} page={page} color="secondary" onChange={handlePageChange} />
      </Box>
      {isAddExpenseDialogOpen && (
        <AddExpenseDialog
          open={isAddExpenseDialogOpen}
          onClose={() => setIsAddExpenseDialogOpen(false)}
          fetchExpenses={fetchExpenses}
        />
      )}
      {selectedExpense && (
        <>
          <DeleteExpenseDialog
            open={isDeleteExpenseDialogOpen}
            onClose={onCloseDeleteExpenseDialogHandler}
            fetchExpenses={fetchExpenses}
            expense={selectedExpense}
          />
          <EditExpenseDialog
            open={isEditExpenseDialogOpen}
            onClose={onCloseEditExpenseDialogHandler}
            expenseToEdit={selectedExpense}
            fetchExpenses={fetchExpenses}
          />
        </>
      )}
    </BaseCard>
  );
};

export default Expenses;
