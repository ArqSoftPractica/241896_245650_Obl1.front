import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface AddRecurringTransactionRequest {
  amount: number;
  description: string;
  categoryId: number;
  type: 'income' | 'expense';
}

export interface Response {
  message: string;
}

export const addRecurringTransaction = (request: AddRecurringTransactionRequest): Promise<Response> => {
  const addTransactionResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions`, {
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
  return addTransactionResponse;
};
