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
import CategoriesTableTitle from './CategoriesTableTitle';

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

const categoriesTableColumns = ['Name', 'Description', 'Image', 'Monthly Spending Limit', ''];

const CategoriesTable: React.FC<Record<string, never>> = () => {
  return (
    <BaseCard>
      <CategoriesTableTitle />
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
              <TableCell style={{ width: '60px' }}>
                <Typography color="textSecondary" variant="h6">
                  {amount}
                </Typography>
              </TableCell>
              <TableCell style={{ width: '20px' }}>
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
      <Box sx={{ paddingTop: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={8} color="secondary" />
      </Box>
    </BaseCard>
  );
};

export default CategoriesTable;
