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

export type ChatState = {
  activeCategory: ChatCategory;
  chats: Record<string, ChatContact>;
  activeChatId: string | null;
};

const initialState: ChatState = {
  activeCategory: 'active',
  activeChatId: null,
  chats: {},
};

export const chats = createSlice({
  initialState,
  name: 'chats',
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      chatApi.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        const chats = payload.reduce((acc, curr) => {
          return { ...acc, [curr.id]: [] };
        }, {});
        return { ...state, chats };
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
