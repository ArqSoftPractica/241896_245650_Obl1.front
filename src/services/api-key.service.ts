import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface Response {
  message: string;
  apiKey: string;
}

export const refreshApiKey = (): Promise<Response> => {
  const refreshApiKeyResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/api-key`, {
    method: 'PUT',
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
  return refreshApiKeyResponse;
};

export const getApiKey = (): Promise<Response> => {
  const getApiKeyResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/api-key`, {
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
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return getApiKeyResponse;
};
