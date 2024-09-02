import * as D from 'io-ts/Decoder';
import { pipe } from 'fp-ts/function';
import { Either, isRight, isLeft } from 'fp-ts/lib/Either';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { authenticationApi } from '@/features/Authentication/authenticationApi';

const parse =
  <A, B>(model: D.Decoder<A, B>, onError?: (error: D.DecodeError) => void) =>
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
  model: D.Decoder<A, B>,
  defaultValue: B,
  mapper: (a: B) => C,
  onError?: (error: D.DecodeError) => void,
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

const refreshResponse = D.struct({
  access_token: D.string,
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
      const token = parseAndTransformTo(
        refreshResult.data,
        refreshResponse,
        { access_token: '' },
        ({ access_token }) => access_token,
      );
      sessionStorage.setItem('access_token', token);
      // retry the initial query
      return await baseQuery(args, api, extraOptions);
    } else {
      // if refresh fail, logout
      api.dispatch(authenticationApi.endpoints.logout.initiate());
      return { data: result.data };
    }
  }

  return result;
};
