import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatMessage {
  opened: boolean;
  content: string;
  id: string;
  recipientId: string;
  senderId: string;
  created: string;
}

interface ChatContact {
  active: boolean;
  id: string;
  role: string;
  displayName: string;
  category: 'active' | 'archived' | 'blocked';
  messages: ChatMessage[];
  status: string;
}

interface ChatState {
  activeCategory: 'active' | 'archived' | 'blocked';
  chats: ChatContact[];
  activeChatId: string | null;
}

const initialState: ChatState = {
  activeCategory: 'active',
  activeChatId: null,
  chats: [],
};

export const chats = createSlice({
  initialState,
  name: 'chats',
  reducers: {
    addChat: (state, action: PayloadAction<ChatContact>) => {
      const chat = action.payload;
      const index = state.chats.findIndex(c => c.id === chat.id);
      if (index === -1) {
        state.chats.push(chat);
      } else {
        state.chats[index] = chat;
      }
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: ChatMessage }>,
    ) => {
      const { chatId, message } = action.payload;
      const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].messages.push(message);
      }
    },
    setActiveCategory: (
      state,
      action: PayloadAction<'active' | 'archived' | 'blocked'>,
    ) => {
      state.activeCategory = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;

      // Mark all messages as opened
      const chatIndex = state.chats.findIndex(
        chat => chat.id === action.payload,
      );
      if (chatIndex !== -1) {
        state.chats[chatIndex].messages = state.chats[chatIndex].messages.map(
          message => ({ ...message, opened: true }),
        );
      }
    },
    updateChat: (
      state,
      action: PayloadAction<{ chatId: string; chatData: Partial<ChatContact> }>,
    ) => {
      const { chatId, chatData } = action.payload;
      const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex] = { ...state.chats[chatIndex], ...chatData };
        const chats = state.chats;
        const activeCategory = state.activeCategory;
        const activeChats = chats.filter(
          chat => chat.category === activeCategory,
        );
        if (activeChats.length === 0) {
          state.activeChatId = null;
        } else {
          state.activeChatId = activeChats[0].id;
        }
      }
    },
    updateMessage: (
      state,
      action: PayloadAction<{
        chatId: string;
        messageId: string;
        messageData: Partial<ChatMessage>;
      }>,
    ) => {
      const { chatId, messageId, messageData } = action.payload;
      const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        const messageIndex = state.chats[chatIndex].messages.findIndex(
          message => message.id === messageId,
        );
        if (messageIndex !== -1) {
          state.chats[chatIndex].messages[messageIndex] = {
            ...state.chats[chatIndex].messages[messageIndex],
            ...messageData,
          };
        }
      }
    },
  },
});

export const {
  addChat,
  addMessage,
  setActiveCategory,
  setActiveChat,
  updateChat,
} = chats.actions;
export type { ChatState, ChatContact, ChatMessage };

export const getActiveChat = (state: RootState) => {
  const activeChatId = state.chats.activeChatId;
  const chats = state.chats.chats;
  return chats.find(chat => chat.id === activeChatId);
};

export const getChatsByActiveCategory = (state: RootState) => {
  const chats = state.chats.chats;
  const activeCategory = state.chats.activeCategory;
  return chats.filter(chat => chat.category === activeCategory);
};
