import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { chatApi } from './chatPageApi';

export type ChatCategory = 'active' | 'archived' | 'banned';

export type ChatMessage = {
  opened: boolean;
  content: string;
  id: string;
  recipientId: string;
  senderId: string;
  created: string;
};

export type ChatContact = {
  active: boolean;
  id: string;
  role: string;
  displayName: string;
  category: ChatCategory;
  messages: ChatMessage[];
  status: string;
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
    builder.addMatcher(
      chatApi.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        const buddyIds = payload.map(buddy => buddy.id);
        const chats = payload.reduce((acc, curr) => {
          return { ...acc, [curr.id]: [] };
        }, {});

        return {
          ...state,
          chats,
          pollingParams: [{ type: 'InitialMessages', buddyIds }],
        };
      },
    );
  },
});

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
