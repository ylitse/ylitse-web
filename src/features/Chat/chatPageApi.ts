import { parseAndTransformTo } from '@/utils/http';
import type { ChatBuddy, PollingParam } from './mappers';
import {
  type Buddy,
  type MessageResponse,
  type MessageData,
  type Message,
  type AppMessage,
  type Contact,
  type ChatFolder,
} from './models';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import {
  statusUpdateErrorMessages,
  statusUpdateSuccessMessages,
} from './constants';
import { contactsResponseCodec, messagesResponseCodec } from './models';
import { baseApi } from '@/baseApi';

type MessageQuery = {
  userId: string;
  params: PollingParam;
};

export type NewMessage = {
  message: MessageData;
  userId: string;
};

type PutMessage = {
  message: Message;
  userId: string;
};

type PutStatus = {
  buddyId: string;
  nextStatus: ChatFolder;
  userId: string;
  originalStatus: ChatFolder;
};

type reportMessage = {
  buddyId: string;
  contactInfo: string;
  reportReason: string;
  userId: string;
};

export const chatApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getContacts: builder.query<Array<Buddy>, string>({
      query: userId => `users/${userId}/contacts`,
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          contactsResponseCodec,
          { resources: [] },
          ({ resources }) => toAppBuddies(resources),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:notification.fetchingContactsError'), {
            id: 'contact-fetch-failure',
          });
        }
      },
    }),
    getMessages: builder.query<MessageResponse, MessageQuery>({
      query: ({ userId, params }) =>
        `users/${userId}/messages?${toQueryString(params)}`,
      transformResponse: (response: unknown, _meta, { userId }) =>
        parseAndTransformTo(
          response,
          messagesResponseCodec,
          { resources: [], contacts: [] },
          ({ resources, contacts }) => ({
            messages: [...resources]
              .map(toAppMessage(userId))
              .sort(sortByCreated),
            buddies: toAppBuddies(contacts),
          }),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:notification.pollingError'), {
            id: 'poll-failure',
          });
        }
      },
    }),
    sendMessage: builder.mutation<unknown, NewMessage>({
      query: ({ userId, message }) => ({
        url: `users/${userId}/messages`,
        method: 'post',
        body: message,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:notification.messageSendError'), {
            id: 'message-send-failure',
          });
        }
      },
    }),
    markSeen: builder.mutation<unknown, PutMessage>({
      query: ({ userId, message }) => ({
        url: `users/${userId}/messages/${message.id}`,
        method: 'put',
        body: { ...toSeen(message), active: true },
      }),
    }),
    updateStatus: builder.mutation<unknown, PutStatus>({
      query: ({ userId, buddyId, nextStatus }) => ({
        url: `users/${userId}/contacts/${buddyId}`,
        method: 'put',
        body: { status: nextStatus },
      }),
      async onQueryStarted({ nextStatus, originalStatus }, result) {
        try {
          await result.queryFulfilled;
          if (originalStatus === 'banned' && nextStatus === 'ok') {
            toast.success(t('chat:notification.unblockingSuccess'), {
              id: `unblocked-status-success`,
            });
          } else {
            toast.success(t(statusUpdateSuccessMessages[nextStatus]), {
              id: `${nextStatus}-status-success`,
            });
          }
        } catch (err) {
          toast.error(t(statusUpdateErrorMessages[nextStatus]), {
            id: `${nextStatus}-status-failure`,
          });
        }
      },
    }),
    reportMentor: builder.mutation<unknown, reportMessage>({
      query: ({ buddyId, contactInfo, reportReason, userId }) => ({
        url: `reports`,
        method: 'post',
        body: {
          contact_field: contactInfo,
          report_reason: reportReason,
          reported_user_id: buddyId,
          reporter_user_id: userId,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(t('chat:dialog.report.failure'), {
            id: `report-failure`,
          });
        }
      },
    }),
  }),
});

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

const toAppBuddies = (contacts: Array<Contact>): Array<Buddy> =>
  contacts.flatMap(toBuddy);

const toBuddy = ({ display_name, id, role, ...rest }: Contact) => {
  if (rest?.status === 'deleted') {
    return [];
  }

  return {
    displayName: display_name,
    buddyId: id,
    status: rest?.status ?? 'ok',
    role,
  } as Buddy;
};

const toAppMessage =
  (userId: string) =>
  ({ sender_id, recipient_id, opened, ...rest }: Message): AppMessage => {
    const isSent = userId === sender_id;
    return {
      buddyId: isSent ? recipient_id : sender_id,
      opened: isSent ? true : opened,
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

  return allMessages[0]?.id ?? '';
};

const toSeen = (msg: Message) => ({ ...msg, opened: true });

export const toPutMessage = (
  msg: AppMessage,
  buddyId: string,
  userId: string,
): Message => ({
  sender_id: userId,
  recipient_id: buddyId,
  content: msg.content,
  created: msg.created,
  id: msg.id,
  opened: msg.opened,
});

export const toSendMessage = (
  buddyId: string,
  userId: string,
  text: string,
) => ({
  recipient_id: buddyId,
  sender_id: userId,
  content: text.trim(),
  opened: false,
});

export const {
  useGetContactsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkSeenMutation,
  useUpdateStatusMutation,
  useReportMentorMutation,
} = chatApi;
