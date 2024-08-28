import { DecodeError, Decoder } from 'io-ts/Decoder';
import { pipe } from 'fp-ts/function';
import { Either, isRight, isLeft } from 'fp-ts/lib/Either';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { removeCookie } from './utils';

const YLITSE_COOKIE = 'YLITSE';

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
    const refreshResult = await baseQuery('/webrefresh', api, extraOptions);

    if (refreshResult.data) {
      // retry the initial query
      await baseQuery(args, api, extraOptions);
    } else {
      // if refresh fail, logout
      removeCookie(YLITSE_COOKIE);
      window.location.href = '/login/';
      return { data: result.data };
    }
  }

  return result;
};
