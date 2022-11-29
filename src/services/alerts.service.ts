import InvalidRequestError from 'src/services/errors/InvalidRequest';

export interface SubscriptionRequest {
  categoryId: number;
}

export interface Response {
  message: string;
}

export const subscribeToAlertsOfOneCategory = (request: SubscriptionRequest): Promise<Response> => {
  const subscribeResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/alerts`, {
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

export const unsubscribeToAlertsOfOneCategory = (request: SubscriptionRequest): Promise<Response> => {
  const subscribeResponse = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/alerts`, {
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
