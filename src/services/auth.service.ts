import { User } from 'src/interfaces/User';
import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface LogInRequest {
  email: string;
  password: string;
}

export interface Response {
  message: string;
  token: string;
}

export const logIn = async (request: LogInRequest): Promise<Response> => {
  try {
    const logInResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsedResponse: Response = await logInResponse.json();
    if (!logInResponse.ok) {
      throw new InvalidRequestError(parsedResponse.message);
    }

    localStorage.setItem('token', parsedResponse.token);
    await getUser().catch((err) => err);

    return parsedResponse;
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidRequestError) {
      throw error;
    }
    throw new Error('Oops! Something went wrong. Please try again later.');
  }
};

export interface GetUserResponse {
  message: string;
  user: User;
}

export const getUser = async (): Promise<GetUserResponse> => {
  try {
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const parsedResponse: GetUserResponse = await userResponse.json();
    if (!userResponse.ok) {
      throw new InvalidRequestError(parsedResponse.message);
    }

    localStorage.setItem('user', JSON.stringify(parsedResponse.user));
    return parsedResponse;
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidRequestError) {
      throw error;
    }
    throw new Error('Oops! Something went wrong. Please try again later.');
  }
};
