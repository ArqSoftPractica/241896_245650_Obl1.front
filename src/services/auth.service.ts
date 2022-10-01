import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface LogInRequest {
  email: string;
  password: string;
}

export interface Response {
  message: string;
  token: string;
}

export const logIn = (request: LogInRequest): Promise<Response> => {
  const logInResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      const parsedResponse: Response = await response.json();
      if (!response.ok) {
        throw new InvalidRequestError(parsedResponse.message);
      }
      return parsedResponse;
    })
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    })
    .catch((error) => {
      console.log(error);
      if (error instanceof InvalidRequestError) {
        throw error;
      }
      throw new Error('Oops! Something went wrong. Please try again later.');
    });
  return logInResponse;
};
