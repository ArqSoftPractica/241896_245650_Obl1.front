import React, { useCallback, useEffect, useState } from 'react';
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
import BaseCard from '../baseCard/BaseCard';
import ExpensesTableTitle from './ExpensesTableTitle';
import DeleteExpenseDialog from './dialogs/DeleteExpenseDialog';
import AddEditExpenseDialog from './dialogs/AddEditExpenseDialog';

export interface Props {
  fromDate: Date;
  toDate: Date;
  handleFromDateChange: (date: Date | null) => void;
  handleToDateChange: (date: Date | null) => void;
}

const EXPENSES_PER_PAGE = 4;

const expensesTableColumns = ['Date', 'Category', 'Description', 'Amount', ''];

const Expenses: React.FC<Props> = ({ fromDate, toDate, handleFromDateChange, handleToDateChange }) => {
  const [isDeleteExpenseDialogOpen, setIsDeleteExpenseDialogOpen] = useState<boolean>(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState<boolean>(false);
  const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [page, setPage] = useState<number>(1);

  const onAddExpenseHandler = (): void => {
    console.log('added');
    console.log('reloads expenses');
    setIsAddExpenseDialogOpen(false);
  };

  const onEditExpenseHandler = (): void => {
    console.log('edited');
    console.log('reloads expenses');
    setIsEditExpenseDialogOpen(false);
  };

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

  const fetchExpenses = useCallback(() => {
    getExpenses({ fromDate, toDate, take: EXPENSES_PER_PAGE, skip: (page - 1) * EXPENSES_PER_PAGE })
      .then(({ expenses: expensesObtained }) => {
        setExpenses([...expensesObtained]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [fromDate, toDate, page]);

  useEffect(() => {
    fetchExpenses();
  }, [fromDate, toDate, page, fetchExpenses]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
            {expensesTableColumns.map((column) => (
              <TableCell key={column}>
                <Typography color="textPrimary" variant="h6">
                  {column}
                </Typography>
              </TableCell>
            ))}
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box sx={{ paddingTop: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={8} page={page} color="secondary" onChange={handlePageChange} />
      </Box>
      <AddEditExpenseDialog
        open={isAddExpenseDialogOpen}
        onClose={() => setIsAddExpenseDialogOpen(false)}
        onAddHandler={onAddExpenseHandler}
      />
      <AddEditExpenseDialog
        open={isEditExpenseDialogOpen}
        editMode
        onClose={() => setIsEditExpenseDialogOpen(false)}
        onAddHandler={onEditExpenseHandler}
        currentValues={selectedExpense}
      />
      {selectedExpense && (
        <DeleteExpenseDialog
          open={isDeleteExpenseDialogOpen}
          onClose={onCloseDeleteExpenseDialogHandler}
          fetchExpenses={fetchExpenses}
          expense={selectedExpense}
        />
      )}
    </BaseCard>
  );
};

export default Expenses;
