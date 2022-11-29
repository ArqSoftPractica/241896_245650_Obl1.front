import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface SubscriptionRequest {
  categoryId: number;
}

export interface Response {
  message: string;
}

export const subscribeToNotificationsOfOneCategory = (request: SubscriptionRequest): Promise<Response> => {
  const subscribeResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/notifications`, {
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
  return subscribeResponse;
};

export const unsubscribeToNotificationsOfOneCategory = (request: SubscriptionRequest): Promise<Response> => {
  const subscribeResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/notifications`, {
    method: 'DELETE',
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
  return subscribeResponse;
};
