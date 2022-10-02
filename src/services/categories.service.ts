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

export interface AddCategoryRequest {
  name: string;
  monthlySpendingLimit: number;
  description: string;
  image: string;
}

export interface Response {
  message: string;
}

export const addCategory = (request: AddCategoryRequest): Promise<Response> => {
  const addCategoryResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
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
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return addCategoryResponse;
};

export interface DeleteCategoryRequest {
  categoryId: number;
}

export const deleteCategory = (request: DeleteCategoryRequest): Promise<Response> => {
  const { categoryId } = request;
  const deleteCategoryResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${categoryId}`, {
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
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return deleteCategoryResponse;
};

export interface EditCategoryRequest {
  categoryId: number;
  newValues: {
    name: string;
    description: string;
    monthlySpendingLimit: number;
    image: string;
  };
}

export const editCategory = (request: EditCategoryRequest): Promise<Response> => {
  const { categoryId, newValues } = request;
  const editCategoryResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${categoryId}`, {
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
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return editCategoryResponse;
};
