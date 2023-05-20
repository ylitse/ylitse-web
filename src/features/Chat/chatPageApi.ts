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

type Message = D.TypeOf<typeof messageCodec>;
export type AppMessage = {
  isSent: boolean;
  id: string;
  content: string;
  opened: boolean;
  created: string;
  buddyId: string;
};

type ChatStatus = D.TypeOf<typeof status>;
export type ChatFolder = Exclude<ChatStatus, 'deleted'>;
export type Role = D.TypeOf<typeof role>;

type Contact = D.TypeOf<typeof contactCodec>;
export type Buddy = Omit<Contact, 'display_name' | 'id' | 'status'> & {
  buddyId: string;
  displayName: string;
  status: ChatFolder;
};

type MessageQuery = {
  userId: string;
  params: PollingParam;
};

export type MessageResponse = {
  messages: Array<AppMessage>;
  buddies: Array<Buddy>;
};

const toQueryString = (params: PollingParam) => {
  const maxMessagesAtOnce = 10;

  if (params.type === 'New' && params.previousMsgId.length > 0) {
    return `from_message_id=${params.previousMsgId}&desc=false&max=${maxMessagesAtOnce}`;
  }

  if (params.type === 'OlderThan') {
    return `contact_user_ids=${params.buddyId}&from_message_id=${params.messageId}&max=${maxMessagesAtOnce}&desc=true`;
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
          ({ resources }) => toAppBuddies(resources),
        ),
    }),
    getMessages: builder.query<MessageResponse, MessageQuery>({
      query: ({ userId, params }) =>
        `users/${userId}/messages?${toQueryString(params)}`,
      transformResponse: (response: unknown, _meta, { userId }) =>
        validateAndTransformTo(
          response,
          messagesResponseCodec,
          { resources: [], contacts: [] },
          ({ resources, contacts }) => ({
            messages: resources.map(toMessage(userId)),
            buddies: toAppBuddies(contacts),
          }),
        ),
    }),
  }),
});

const toAppBuddies = (contacts: Array<Contact>): Array<Buddy> =>
  contacts.flatMap(toBuddy);

const toBuddy = ({ display_name, id, ...rest }: Contact) => {
  if (rest?.status === 'deleted') {
    return [];
  }

  return {
    displayName: display_name,
    buddyId: id,
    status: rest?.status ?? 'ok',
    ...rest,
  } as Buddy;
};

const toMessage =
  (userId: string) =>
  ({ sender_id, recipient_id, ...rest }: Message): AppMessage => {
    const isSent = userId === sender_id;
    return {
      buddyId: isSent ? recipient_id : sender_id,
      isSent,
      ...rest,
    };
  };

export const sortByCreated = (a: AppMessage, b: AppMessage) => {
  return a.created < b.created ? -1 : 1;
};

export const extractMostRecentId = (
  existingChats: Record<string, ChatBuddy>,
  newMessages: Array<AppMessage>,
) => {
  const fromExisting = Object.keys(existingChats).reduce<Array<AppMessage>>(
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
