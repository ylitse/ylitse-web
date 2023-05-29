import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import {
  chatApi,
  ChatFolder,
  extractMostRecentId,
  AppMessage,
  Buddy,
  MessageResponse,
  sortByCreated,
} from './chatPageApi';

export type ChatBuddy = Buddy & {
  messages: AppMessage[];
};

export type PollingParam =
  | {
      type: 'New';
      previousMsgId: string;
    }
  | { type: 'OlderThan'; buddyId: string; messageId: string }
  | { type: 'InitialMessages'; buddyIds: Array<string> };

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
  reducers: {
    setActiveFolder: (state, action: PayloadAction<ChatFolder>) => {
      state.activeFolder = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    addPollParam: (state, action: PayloadAction<PollingParam>) => {
      const currentParams = state.pollingParams ?? [];
      state.pollingParams = [action.payload, ...currentParams];
    },
  },
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
        ({ chats, ...rest }, { payload: response }) => {
          const updatedMessages = mergeMessages(chats, response);
          const mostRecentMessageId = extractMostRecentId(
            chats,
            response.messages,
          );
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
  response: MessageResponse,
) =>
  response.buddies.reduce((chats, contact) => {
    const newMessages = response.messages.filter(
      ({ buddyId }) => buddyId === contact.buddyId,
    );
    const existingMessages = originalChats[contact.buddyId].messages ?? [];

    return {
      ...chats,
      [contact.buddyId]: {
        ...contact,
        messages: existingMessages.concat(newMessages).sort(sortByCreated),
      },
    };
  }, originalChats);

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

export const selectBuddyMessages = (buddyId: string) =>
  createSelector(
    selectChatState,
    selectIsLoadingBuddyMessages(buddyId),
    ({ chats }, isLoading) => {
      const buddy = chats[buddyId];
      const hasMessages = buddy.messages.length > 0;
      const unread = buddy.messages.filter(message => !message.opened);

      return {
        latest: hasMessages
          ? buddy.messages[buddy.messages.length - 1].content
          : '',
        unread: { hasUnread: unread.length > 0, count: unread.length },
        isLoading,
      };
    },
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

const isLoadingOlderMessages = (pollingParams: PollingParam, buddyId: string) =>
  pollingParams.type === 'OlderThan' && pollingParams.buddyId === buddyId;

const isLoadingInitialMessages = (
  pollingParams: PollingParam,
  buddyId: string,
) =>
  pollingParams.type === 'InitialMessages' &&
  pollingParams.buddyIds.includes(buddyId);

export const selectIsLoadingBuddyMessages = (buddyId?: string) =>
  createSelector(selectChatState, ({ pollingParams }) => {
    if (!pollingParams || !buddyId) {
      return false;
    }

    return pollingParams.some(
      param =>
        isLoadingOlderMessages(param, buddyId) ||
        isLoadingInitialMessages(param, buddyId),
    );
  });

export const { setActiveFolder, setActiveChat, addPollParam } = chats.actions;
