import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import BaseCard from '../baseCard/BaseCard';

const expenses = [
  {
    date: '12/12/2021',
    category: 'Entertainment',
    description: 'Movie',
    amount: 213123,
  },
  {
    date: '12/12/2021',
    category: 'Entertainment',
    description: 'Movie',
    amount: 213123,
  },
];

const ExpensesTable = () => {
  return (
    <BaseCard title="Expenses">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: 'nowrap',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Amount
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.date}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.category}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.amount}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default ExpensesTable;
