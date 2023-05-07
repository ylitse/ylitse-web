import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { chatApi, Message } from './chatPageApi';

export type ChatCategory = 'active' | 'archived' | 'banned';

export type ChatContact = {
  active: boolean;
  id: string;
  role: string;
  display_name: string;
  status?: ChatCategory;
  messages: Message[];
};

export type PollingParam =
  | {
      type: 'New';
      previousMsgId: string;
    }
  | { type: 'InitialMessages'; buddyIds: Array<string> };

export type ChatState = {
  activeCategory: ChatCategory;
  chats: Record<string, ChatContact>;
  activeChatId: string | null;
  pollingParams: Array<PollingParam> | null;
};

const initialState: ChatState = {
  activeCategory: 'active',
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
          const buddyIds = payload.map(buddy => buddy.id);
          const chats: Record<string, ChatContact> = payload.reduce(
            (acc, curr) => {
              return { ...acc, [curr.id]: { ...curr, messages: [] } };
            },
            {},
          );

          return {
            ...state,
            chats,
            pollingParams: [{ type: 'InitialMessages', buddyIds }],
          };
        },
      )
      .addMatcher(
        chatApi.endpoints.getMessages.matchFulfilled,
        ({ chats, ...rest }, { payload: newMessages }) => {
          const updatedMessages = mergeMessages(chats, newMessages);
          return { ...rest, chats: updatedMessages };
        },
      );
  },
});

const mergeMessages = (
  originalChats: Record<string, ChatContact>,
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

const selectChatState = ({ chats }: RootState) => chats;

export const selectActiveChat = createSelector(
  selectChatState,
  ({ activeChatId, chats }) => (activeChatId ? chats[activeChatId] : null),
);

export const selectChats = createSelector(
  selectChatState,
  ({ activeCategory, chats }) => {
    const filtered = Object.keys(chats)
      .map(buddyId => chats[buddyId])
      .filter(chat => chat.status === activeCategory);
    return filtered;
  },
);

const defaultParams: PollingParam = { type: 'New', previousMsgId: '' };
export const selectCurrentPollingParams = createSelector(
  selectChatState,
  ({ pollingParams }) => {
    const nextParams = !pollingParams
      ? null
      : pollingParams.length === 0
      ? defaultParams
      : pollingParams[0];

    return nextParams;
  },
);
