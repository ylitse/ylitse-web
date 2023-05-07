import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { validateAndTransformTo } from '@/utils/http';
import { role } from '../Authentication/myuserApi';
import { pipe } from 'fp-ts/lib/function';

const status = D.literal('banned', 'archived', 'ok', 'deleted');

const optionalProperties = D.partial({
  status: status,
});
const mandatoryProperties = D.struct({
  active: D.boolean,
  display_name: D.string,
  id: D.string,
  role: role,
});

const contactCodec = pipe(mandatoryProperties, D.intersect(optionalProperties));

const contactsResponseCodec = D.struct({ resources: D.array(contactCodec) });

export type Contact = D.TypeOf<typeof contactCodec>;

export const chatApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'api/' }),
  reducerPath: 'chatsApi',
  endpoints: builder => ({
    getContacts: builder.query<Array<Contact>, string>({
      query: userId => `users/${userId}/contacts`,
      transformResponse: (response: unknown) =>
        validateAndTransformTo(
          response,
          contactsResponseCodec,
          { resources: [] },
          ({ resources }) => resources,
        ),
    }),
  }),
});

export const { useGetContactsQuery } = chatApi;
