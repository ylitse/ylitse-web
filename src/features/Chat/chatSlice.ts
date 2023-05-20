import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import {
  chatApi,
  ChatStatus,
  extractMostRecentId,
  Message,
  MessageResponse,
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
  reducers: {
    setActiveFolder: (state, action: PayloadAction<ChatFolder>) => {
      state.activeFolder = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
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
            response.resources,
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
  response.contacts.reduce((chats, contact) => {
    const newMessages = response.resources.filter(
      msg => msg.recipient_id === contact.id || msg.sender_id === contact.id,
    );

    return {
      ...chats,
      [contact.id]: {
        ...originalChats[contact.id],
        messages: originalChats[contact.id].messages.concat(newMessages),
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

export const selectLatestAndUnreadMessages = (buddyId: string) =>
  createSelector(selectChatState, ({ chats }) => {
    const buddy = chats[buddyId];
    const hasMessages = buddy.messages.length > 0;
    const unread = buddy.messages.filter(message => !message.opened);
    return {
      latest: hasMessages
        ? buddy.messages[buddy.messages.length - 1].content
        : '',
      unread: { hasUnread: unread.length > 0, count: unread.length },
    };
  });

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

export const { setActiveFolder, setActiveChat } = chats.actions;
