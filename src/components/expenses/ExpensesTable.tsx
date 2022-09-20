import React, { useEffect, useState } from 'react';
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
import Expense from 'src/interfaces/Expense';
import BaseCard from '../baseCard/BaseCard';
import ExpensesTableTitle from './ExpensesTableTitle';
import DeleteExpenseDialog from './dialogs/DeleteExpenseDialog';
import AddEditExpenseDialog from './dialogs/AddEditExpenseDialog';

const expenses: Expense[] = [
  {
    id: '1',
    date: '12/12/2021',
    category: 'Entertainment',
    description: 'Movie',
    amount: 213123,
  },
  {
    id: '2',
    date: '12/12/2020',
    category: 'Food',
    description: 'Burgers & Fries',
    amount: 2123,
  },
];

const expensesTableColumns = ['Date', 'Category', 'Description', 'Amount', ''];

const ExpensesTable: React.FC<Record<string, never>> = () => {
  const [isDeleteExpenseDialogOpen, setIsDeleteExpenseDialogOpen] = useState<boolean>(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState<boolean>(false);
  const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState<boolean>(false);
  const [editedExpense, setEditedExpense] = useState<Expense>();

  const onDeleteExpenseHandler = (): void => {
    console.log('deleted');
    console.log('reloads expenses');
    setIsDeleteExpenseDialogOpen(false);
  };

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
    console.log('opens edit expense dialog');
    setEditedExpense(expense);
    setIsEditExpenseDialogOpen(true);
  };

  return (
    <BaseCard>
      <ExpensesTableTitle setIsAddExpenseDialogOpen={setIsAddExpenseDialogOpen} />
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
          {expenses.map(({ id, date, category, description, amount }) => (
            <TableRow key={id}>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {date}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {category}
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
                      category,
                      description,
                      amount,
                    })
                  }
                >
                  <FeatherIcon icon="edit" width="20" height="20" />
                </IconButton>
                <IconButton aria-label="delete" color="error" onClick={() => setIsDeleteExpenseDialogOpen(true)}>
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
        currentValues={editedExpense}
      />
      <DeleteExpenseDialog
        open={isDeleteExpenseDialogOpen}
        onClose={() => setIsDeleteExpenseDialogOpen(false)}
        onDeleteHandler={onDeleteExpenseHandler}
      />
    </BaseCard>
  );
};

export default ExpensesTable;
