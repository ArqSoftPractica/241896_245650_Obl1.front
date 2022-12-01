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
  Button,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { Income } from 'src/interfaces/Income';
import { getIncomes } from 'src/services/incomes.service';
import { toast } from 'react-toastify';
import formatDate from 'src/utils/formatDate';
import useUser from 'hooks/useUser';
import { getBalanceByEmail } from 'src/services/balance.service';
import BaseCard from '../baseCard/BaseCard';
import IncomesTableTitle from './IncomesTableTitle';
import DeleteIncomeDialog from './dialogs/DeleteIncomeDialog';
import EditIncomeDialog from './dialogs/EditIncomeDialog';
import AddIncomeDialog from './dialogs/AddIncomeDialog';
import AddRecurringIncomeDialog from './dialogs/AddRecurringIncomeDialog';

export interface Props {
  fromDate: Date;
  toDate: Date;
  handleFromDateChange: (date: Date | null) => void;
  handleToDateChange: (date: Date | null) => void;
}

const EXPENSES_PER_PAGE = 4;

const incomesTableColumns = [
  { name: 'Date', roles: ['admin', 'user'] },
  { name: 'Category', roles: ['admin', 'user'] },
  { name: 'Description', roles: ['admin', 'user'] },
  { name: 'Amount', roles: ['admin', 'user'] },
  { name: '', roles: ['admin'] },
];

const Incomes: React.FC<Props> = ({ fromDate, toDate, handleFromDateChange, handleToDateChange }) => {
  const [isDeleteIncomeDialogOpen, setIsDeleteIncomeDialogOpen] = useState<boolean>(false);
  const [isAddIncomeDialogOpen, setIsAddIncomeDialogOpen] = useState<boolean>(false);
  const [isAddRecurringIncomeDialogOpen, setIsAddRecurringIncomeDialogOpen] = useState<boolean>(false);
  const [isEditIncomeDialogOpen, setIsEditIncomeDialogOpen] = useState<boolean>(false);
  const [selectedIncome, setSelectedIncome] = useState<Income>();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [page, setPage] = useState<number>(1);
  const [quantityOfPages, setQuantityOfPages] = useState<number>(1);

  const onEditIncomeClickHandler = (income: Income): void => {
    setSelectedIncome(income);
    setIsEditIncomeDialogOpen(true);
  };

  const onDeleteIncomeClickHandler = (income: Income): void => {
    setSelectedIncome(income);
    setIsDeleteIncomeDialogOpen(true);
  };

  const onCloseDeleteIncomeDialogHandler = (): void => {
    setIsDeleteIncomeDialogOpen(false);
    setSelectedIncome(undefined);
  };

  const onCloseEditIncomeDialogHandler = (): void => {
    setIsEditIncomeDialogOpen(false);
    setSelectedIncome(undefined);
  };

  const getBalance = (): void => {
    getBalanceByEmail({ from: fromDate, to: toDate })
      .then(({ message }) => {
        toast.success(message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const fetchIncomes = useCallback(() => {
    getIncomes({ fromDate, toDate, take: EXPENSES_PER_PAGE, skip: (page - 1) * EXPENSES_PER_PAGE })
      .then(({ incomes: incomesObtained, totalIncomes }) => {
        setIncomes([...incomesObtained]);
        setQuantityOfPages(Math.max(1, Math.ceil(totalIncomes / EXPENSES_PER_PAGE)));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [fromDate, toDate, page]);

  useEffect(() => {
    fetchIncomes();
  }, [fromDate, toDate, page, fetchIncomes]);

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
      <IncomesTableTitle
        setIsAddIncomeDialogOpen={setIsAddIncomeDialogOpen}
        setIsAddRecurringIncomeDialogOpen={setIsAddRecurringIncomeDialogOpen}
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
            {incomesTableColumns.map(({ name, roles }) => {
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
          {incomes.length > 0 &&
            incomes.map(({ id, date, category: { id: categoryId, name: categoryName }, description, amount }) => (
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
                        onEditIncomeClickHandler({
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
                        onDeleteIncomeClickHandler({
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
      <Box sx={{ paddingTop: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" style={{ marginRight: '12px' }} color="primary" onClick={getBalance}>
          Send balance via email
          <FeatherIcon icon="mail" width="20" height="20" style={{ marginLeft: '10px' }} />
        </Button>
        <Pagination count={quantityOfPages} page={page} color="secondary" onChange={handlePageChange} />
      </Box>
      <AddIncomeDialog
        open={isAddIncomeDialogOpen}
        onClose={() => setIsAddIncomeDialogOpen(false)}
        fetchIncomes={fetchIncomes}
      />
      <AddRecurringIncomeDialog
        open={isAddRecurringIncomeDialogOpen}
        onClose={() => setIsAddRecurringIncomeDialogOpen(false)}
        fetchIncomes={fetchIncomes}
      />
      {selectedIncome && (
        <>
          <DeleteIncomeDialog
            open={isDeleteIncomeDialogOpen}
            onClose={onCloseDeleteIncomeDialogHandler}
            fetchIncomes={fetchIncomes}
            income={selectedIncome}
          />
          <EditIncomeDialog
            open={isEditIncomeDialogOpen}
            onClose={onCloseEditIncomeDialogHandler}
            incomeToEdit={selectedIncome}
            fetchIncomes={fetchIncomes}
          />
        </>
      )}
    </BaseCard>
  );
};

export default Incomes;
