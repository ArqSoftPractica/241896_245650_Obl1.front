import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface SignUpRequest {
  email: string;
  password: string;
  familyName: string;
  name: string;
}

export interface Response {
  message: string;
}

export const signUp = (request: SignUpRequest): Promise<Response> => {
  const signUpResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
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

export interface InviteMemberRequest {
  email: string;
  role: string;
}

export const inviteNewMember = (request: InviteMemberRequest): Promise<Response> => {
  const signUpResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/invites`, {
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
  return signUpResponse;
};

export interface GetInviteRequest {
  token: string;
}

export interface GetInviteResponse {
  message: string;
  invite: {
    familyId: number;
    email: string;
    role: string;
    family: {
      id: number;
      name: string;
    };
  };
}

export const getInvite = (request: GetInviteRequest): Promise<GetInviteResponse> => {
  const { token } = request;

  const signUpResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/invites?token=${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      const parsedResponse: GetInviteResponse = await response.json();
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

export interface AcceptInviteRequest {
  invitationToken: string;
  password: string;
  email: string;
  name: string;
}

export const acceptInvite = (request: AcceptInviteRequest): Promise<Response> => {
  const signUpResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/invites`, {
    method: 'PUT',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      const parsedResponse: GetInviteResponse = await response.json();
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
