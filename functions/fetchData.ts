import {GraphQLError} from 'graphql';
import {ErrorResponse} from '../types/MessageTypes';

const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const errorJson = json as unknown as ErrorResponse;
    console.log(
      'throwing error',
      errorJson.message,
      response.statusText.toUpperCase(),
    );
    throw new GraphQLError(
      errorJson.message || `${response.statusText} occured`,
      {
        extensions: {
          code: response.statusText.toUpperCase(),
          http: {
            status: response.status,
          },
        },
      },
    );
  }
  return json;
};

export default fetchData;
