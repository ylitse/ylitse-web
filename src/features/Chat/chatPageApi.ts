import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { validateAndTransformTo } from '@/utils/http';
import { role } from '../Authentication/myuserApi';
import { pipe } from 'fp-ts/lib/function';
import { ChatContact, PollingParam } from './chatSlice';

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

const messageCodec = D.struct({
  content: D.string,
  created: D.string,
  id: D.string,
  opened: D.boolean,
  recipient_id: D.string,
  sender_id: D.string,
});

const messagesResponseCodec = D.struct({
  resources: D.array(messageCodec),
});

export type Message = D.TypeOf<typeof messageCodec>;

export type Contact = D.TypeOf<typeof contactCodec>;

type MessageQuery = {
  userId: string;
  params: PollingParam;
};

const toQueryString = (params: PollingParam) => {
  const maxMessagesAtOnce = 10;

  if (params.type === 'New' && params.previousMsgId.length > 0) {
    return `from_message_id=${params.previousMsgId}&desc=false&max=${maxMessagesAtOnce}`;
  }

  if (params.type === 'InitialMessages') {
    const userIds = params.buddyIds.join(',');

    return `contact_user_ids=${userIds}&max=${maxMessagesAtOnce}&desc=true`;
  }

  return `max=${maxMessagesAtOnce}&desc=true`;
};

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
    getMessages: builder.query<Array<Message>, MessageQuery>({
      query: ({ userId, params }) =>
        `users/${userId}/messages?${toQueryString(params)}`,
      transformResponse: (response: unknown) =>
        validateAndTransformTo(
          response,
          messagesResponseCodec,
          { resources: [] },
          ({ resources }) => resources,
        ),
    }),
  }),
});

const sortByCreated = (a: Message, b: Message) => {
  return a.created < b.created ? -1 : 1;
};

export const extractMostRecentId = (
  existingChats: Record<string, ChatContact>,
  newMessages: Array<Message>,
) => {
  const fromExisting = Object.keys(existingChats).reduce<Array<Message>>(
    (messages, buddyId) => {
      return messages.concat(existingChats[buddyId].messages);
    },
    [],
  );

  const allMessages = fromExisting
    .concat(newMessages)
    .sort(sortByCreated)
    .reverse();

  return allMessages[0].id ?? '';
};

export const { useGetContactsQuery, useGetMessagesQuery } = chatApi;
