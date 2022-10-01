import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface GetExpensesPerCategoryResponse {
  message: string;
  expensesPerCategory: {
    id: number;
    name: string;
    totalAmount: number;
  }[];
}

export interface getExpensesPerCategoryRequest {
  fromDate: Date;
  toDate: Date;
}

export const getExpensesPerCategory = (
  request: getExpensesPerCategoryRequest,
): Promise<GetExpensesPerCategoryResponse> => {
  const { fromDate, toDate } = request;

  const signUpResponse = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/analytics/expenses?from=${fromDate}&to=${toDate}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
    .then(async (response) => {
      const parsedResponse: GetExpensesPerCategoryResponse = await response.json();
      if (!response.ok) {
        throw new InvalidRequestError(parsedResponse.message);
      }
      return parsedResponse;
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return signUpResponse;
};

export interface getExpensesRequest {
  fromDate: Date;
  toDate: Date;
  skip: number;
  take: number;
}

export interface GetExpensesResponse {
  message: string;
  expenses: Expense[];
}

export interface Expense {
  id: number;
  amount: number;
  date: Date;
  description: string;
  category: {
    id: number;
    name: string;
  };
}

export const getExpenses = (request: getExpensesRequest): Promise<GetExpensesResponse> => {
  const { fromDate, toDate, skip, take } = request;

  const signUpResponse = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/expenses?from=${fromDate}&to=${toDate}&skip=${skip}&take=${take}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
    .then(async (response) => {
      const parsedResponse: GetExpensesResponse = await response.json();
      if (!response.ok) {
        throw new InvalidRequestError(parsedResponse.message);
      }
      return parsedResponse;
    })
    .then((data) => {
      const expenses = data.expenses.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));
      return { ...data, expenses };
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return signUpResponse;
};
