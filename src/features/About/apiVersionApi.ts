import { baseApi } from '@/baseApi';
import { parseAndTransformTo } from '@/utils/http';

import * as D from 'io-ts/Decoder';

const apiVersion = D.struct({ api: D.string });

export const apiVersionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getApiVersion: builder.query<string, void>({
      query: () => 'version',
      providesTags: ['apiversion'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          apiVersion,
          { api: '' },
          response => response.api,
        ),
    }),
  }),
});

export const { useGetApiVersionQuery } = apiVersionApi;
