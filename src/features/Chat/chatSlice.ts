import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import {
  chatApi,
  ChatStatus,
  extractMostRecentId,
  Message,
  Role,
} from './chatPageApi';

export type ChatBuddy = {
  buddyId: string;
  displayName: string;
  role: Role;
  status: ChatFolder;
  messages: Message[];
};

export type PollingParam =
  | {
      type: 'New';
      previousMsgId: string;
    }
  | { type: 'InitialMessages'; buddyIds: Array<string> };

export type ChatFolder = Exclude<ChatStatus, 'deleted'>;

export type ChatState = {
  activeFolder: ChatFolder;
  chats: Record<string, ChatBuddy>;
  activeChatId: string | null;
  pollingParams: Array<PollingParam> | null;
};

const initialState: ChatState = {
  activeFolder: 'ok',
  activeChatId: null,
  chats: {},
  pollingParams: null,
};

export const chats = createSlice({
  initialState,
  name: 'chats',
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        chatApi.endpoints.getContacts.matchFulfilled,
        (state, { payload }) => {
          const buddyIds = payload.map(({ buddyId }) => buddyId);
          const initialBuddyMessages = createBuddyChunks(buddyIds);
          const chats: Record<string, ChatBuddy> = payload.reduce(
            (acc, curr) => {
              return { ...acc, [curr.buddyId]: { ...curr, messages: [] } };
            },
            {},
          );

          return {
            ...state,
            chats,
            pollingParams: initialBuddyMessages,
          };
        },
      )
      .addMatcher(
        chatApi.endpoints.getMessages.matchFulfilled,
        ({ chats, ...rest }, { payload: newMessages }) => {
          const updatedMessages = mergeMessages(chats, newMessages);
          const mostRecentMessageId = extractMostRecentId(chats, newMessages);
          const nextPollingParams = getNextParams(
            rest.pollingParams ?? [],
            mostRecentMessageId,
          );

          return {
            ...rest,
            chats: updatedMessages,
            pollingParams: nextPollingParams,
          };
        },
      );
  },
});

const createBuddyChunks = (buddyIds: Array<string>): Array<PollingParam> => {
  const chunkSize = 40;
  const amountOfBatches = Math.ceil(buddyIds.length / chunkSize);

  return [...Array(amountOfBatches).keys()]
    .map(index => buddyIds.slice(index * chunkSize, (index + 1) * chunkSize))
    .map(chunk => ({ type: 'InitialMessages', buddyIds: chunk }));
};

const mergeMessages = (
  originalChats: Record<string, ChatBuddy>,
  messages: Array<Message>,
) =>
  Object.keys(originalChats).reduce((chats, buddyId) => {
    const newMessages = messages.filter(
      msg => msg.recipient_id === buddyId || msg.sender_id === buddyId,
    );

    return {
      ...chats,
      [buddyId]: {
        ...originalChats[buddyId],
        messages: originalChats[buddyId].messages.concat(newMessages),
      },
    };
  }, {});

const getNextParams = (
  pollingQueue: Array<PollingParam>,
  previousMsgId: string,
): Array<PollingParam> => {
  const normalPoll = { type: 'New', previousMsgId } as const;
  const nextParams = pollingQueue.slice(1);
  // If params exist, resolve those - when no params, then do the 'normalPoll'
  return nextParams.length > 0 ? nextParams : [normalPoll];
};

const selectChatState = ({ chats }: RootState) => chats;

export const selectActiveChat = createSelector(
  selectChatState,
  ({ activeChatId, chats }) => (activeChatId ? chats[activeChatId] : null),
);

export const selectChats = createSelector(
  selectChatState,
  ({ activeFolder, chats }) => {
    const filtered = Object.keys(chats)
      .map(buddyId => chats[buddyId])
      .filter(chat => chat.status === activeFolder);
    return filtered;
  },
);

const defaultParam: PollingParam = { type: 'New', previousMsgId: '' };
export const selectCurrentPollingParams = createSelector(
  selectChatState,
  ({ pollingParams }) => {
    const nextParams = !pollingParams
      ? null
      : pollingParams.length === 0
      ? defaultParam
      : pollingParams[0];

    return nextParams;
  },
);
