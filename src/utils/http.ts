import { DecodeError, Decoder } from 'io-ts/Decoder';
import { pipe } from 'fp-ts/function';
import { Either, isRight, isLeft } from 'fp-ts/lib/Either';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';

const parse =
  <A, B>(model: Decoder<A, B>, onError?: (error: DecodeError) => void) =>
  (data: A) => {
    const parsed = model.decode(data);
    if (isLeft(parsed)) {
      onError?.(parsed.left);
    }

    return parsed;
  };

const getValueOr =
  <A, B>(defaultValue: B) =>
  (decoded: Either<A, B>) =>
    isRight(decoded) ? decoded.right : defaultValue;

export const parseAndTransformTo = <A, B, C>(
  response: A,
  model: Decoder<A, B>,
  defaultValue: B,
  mapper: (a: B) => C,
  onError?: (error: DecodeError) => void,
) => pipe(response, parse(model, onError), getValueOr(defaultValue), mapper);

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: headers => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const refreshingBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // if unauthorized try to refresh
  const isUnauthorized = result.error && result.error.status === 401;
  if (isUnauthorized) {
    const refresh_token = sessionStorage.getItem('refresh_token');
    const refreshResult = await baseQuery(
      {
        url: 'refresh',
        method: 'POST',
        body: JSON.stringify({ refresh_token }),
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      sessionStorage.setItem(
        'access_token',
        //@ts-ignore
        refreshResult.data.access_token,
      );
      // retry the initial query
      return await baseQuery(args, api, extraOptions);
    } else {
      // if refresh fail, logout
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('access_token');
      window.location.href = '/login/';
      return { data: result.data };
    }
  }

  return result;
};
