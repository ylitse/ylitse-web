import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { validateAndTransformTo } from '@/utils/http';
import { role } from '../Authentication/myuserApi';
import { pipe } from 'fp-ts/lib/function';
import { ChatBuddy, PollingParam } from './chatSlice';

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
  contacts: D.array(contactCodec),
});

export type Message = D.TypeOf<typeof messageCodec>;

export type ChatStatus = D.TypeOf<typeof status>;
export type Role = D.TypeOf<typeof role>;
type Contact = D.TypeOf<typeof contactCodec>;
type Buddy = Omit<Contact, 'display_name' | 'id' | 'status'> & {
  buddyId: string;
  displayName: string;
  status: ChatStatus;
};

type MessageQuery = {
  userId: string;
  params: PollingParam;
};

export type MessageResponse = D.TypeOf<typeof messagesResponseCodec>;

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
    getContacts: builder.query<Array<Buddy>, string>({
      query: userId => `users/${userId}/contacts`,
      transformResponse: (response: unknown) =>
        validateAndTransformTo(
          response,
          contactsResponseCodec,
          { resources: [] },
          ({ resources }) => resources.filter(notDeleted).map(toBuddy),
        ),
    }),
    getMessages: builder.query<MessageResponse, MessageQuery>({
      query: ({ userId, params }) =>
        `users/${userId}/messages?${toQueryString(params)}`,
      transformResponse: (response: unknown) =>
        validateAndTransformTo(
          response,
          messagesResponseCodec,
          { resources: [], contacts: [] },
          response => response,
        ),
    }),
  }),
});

const notDeleted = ({ status }: Contact) =>
  status ? status !== 'deleted' : true;

const toBuddy = ({ display_name, id, ...rest }: Contact): Buddy => ({
  displayName: display_name,
  buddyId: id,
  status: rest?.status ?? 'ok',
  ...rest,
});

const sortByCreated = (a: Message, b: Message) => {
  return a.created < b.created ? -1 : 1;
};

export const extractMostRecentId = (
  existingChats: Record<string, ChatBuddy>,
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
