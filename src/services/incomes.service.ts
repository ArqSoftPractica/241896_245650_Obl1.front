import InvalidRequestError from 'src/services/errors/InvalidRequest';
import { Income } from 'src/interfaces/Income';

export interface getIncomesRequest {
  fromDate: Date;
  toDate: Date;
  skip: number;
  take: number;
}

export interface GetIncomesResponse {
  message: string;
  incomes: Income[];
  totalIncomes: number;
}

export const getIncomes = (request: getIncomesRequest): Promise<GetIncomesResponse> => {
  const { fromDate, toDate, skip, take } = request;

  const getIncomesResponse = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/incomes?from=${fromDate}&to=${toDate}&skip=${skip}&take=${take}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
    .then(async (response) => {
      const parsedResponse: GetIncomesResponse = await response.json();
      if (!response.ok) {
        throw new InvalidRequestError(parsedResponse.message);
      }
      return parsedResponse;
    })
    .then((data) => {
      const incomes = data.incomes.map((income) => ({
        ...income,
        date: new Date(income.date),
      }));
      return { ...data, incomes };
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return getIncomesResponse;
};

export interface AddIncomeRequest {
  amount: number;
  date: Date;
  description: string;
  categoryId: number;
}

export interface Response {
  message: string;
}

export const addIncome = (request: AddIncomeRequest): Promise<Response> => {
  const addIncomeResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/incomes`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(async (response) => {
      const parsedResponse: Response = await response.json();
      if (!response.ok) {
        throw new InvalidRequestError(parsedResponse.message);
      }
      return parsedResponse;
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return addIncomeResponse;
};

export interface DeleteIncomeRequest {
  incomeId: number;
}

export const deleteIncome = (request: DeleteIncomeRequest): Promise<Response> => {
  const { incomeId } = request;
  const deleteIncomeResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/incomes/${incomeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(async (response) => {
      const parsedResponse: Response = await response.json();
      if (!response.ok) {
        throw new InvalidRequestError(parsedResponse.message);
      }
      return parsedResponse;
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return deleteIncomeResponse;
};

export interface EditIncomeRequest {
  incomeId: number;
  newValues: {
    amount: number;
    date: Date;
    description: string;
    categoryId: number;
  };
}

export const editIncome = (request: EditIncomeRequest): Promise<Response> => {
  const { incomeId, newValues } = request;
  const editIncomeResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/incomes/${incomeId}`, {
    method: 'PUT',
    body: JSON.stringify(newValues),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(async (response) => {
      const parsedResponse: Response = await response.json();
      if (!response.ok) {
        throw new InvalidRequestError(parsedResponse.message);
      }
      return parsedResponse;
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return editIncomeResponse;
};
