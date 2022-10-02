import { Category } from 'src/interfaces/Category';
import InvalidRequestError from './errors/InvalidRequest';

export interface getExpensesRequest {
  skip?: number;
  take?: number;
}

export interface GetCategoriesResponse {
  message: string;
  categories: Category[];
}

export const getCategories = (request: getExpensesRequest): Promise<GetCategoriesResponse> => {
  const { skip, take } = request;

  const getCategoriesResponse = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories?${skip ? `skip=${skip}` : ''}&${take ? `take=${take}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
    .then(async (response) => {
      const parsedResponse: GetCategoriesResponse = await response.json();
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
  return getCategoriesResponse;
};
