import React from 'react';
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
import BaseCard from '../baseCard/BaseCard';

const expenses = [
  {
    id: 1,
    date: '12/12/2021',
    category: 'Entertainment',
    description: 'Movie',
    amount: 213123,
  },
  {
    id: 2,
    date: '12/12/2021',
    category: 'Entertainment',
    description: 'Movie',
    amount: 213123,
  },
];

const expensesTableColumns = ['Date', 'Category', 'Description', 'Amount', ''];

const ExpensesTable: React.FC<Record<string, never>> = () => {
  return (
    <BaseCard title="Expenses">
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: 'nowrap',
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
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {expense.date}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {expense.category}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {expense.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {expense.amount}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete" color="primary">
                  <FeatherIcon icon="edit" width="20" height="20" />
                </IconButton>
                <IconButton aria-label="delete" color="error">
                  <FeatherIcon icon="trash" width="20" height="20" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ paddingTop: '30px', paddingRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={8} shape="rounded" variant="outlined" color="secondary" />
      </Box>
    </BaseCard>
  );
};

export default ExpensesTable;
