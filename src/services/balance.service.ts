import InvalidRequestError from './errors/InvalidRequest';

export interface GetBalanceRequest {
  from: Date;
  to: Date;
}

export interface Response {
  message: string;
}

export const getBalanceByEmail = (request: GetBalanceRequest): Promise<Response> => {
  const { from, to } = request;

  const getBalanceResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/balances?from=${from}&to=${to}`, {
    method: 'GET',
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
  return getBalanceResponse;
};
