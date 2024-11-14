import type { RootState } from '@/store';
import type { AppMessage } from './models';
import type { ChatBuddy, PollingParam } from './mappers';

import { createSelector } from 'reselect';

const selectChatState = ({ chats }: RootState) => chats;

const compareMessagesByTimeCreated = (
  messageA: AppMessage,
  messageB: AppMessage,
): number =>
  new Date(messageB.created).getTime() - new Date(messageA.created).getTime();

const sortMessagesByDateDescending = (messages: AppMessage[]): AppMessage[] =>
  [...messages].sort(compareMessagesByTimeCreated);

const sortChats = (a: ChatBuddy, b: ChatBuddy): number => {
  const aHasNoMessages = a.messages.length === 0;
  const bHasNoMessages = b.messages.length === 0;

  // If both chats have no messages, they are considered equal
  if (aHasNoMessages && bHasNoMessages) return 0;

  // If only a has no messages, it should come first
  if (aHasNoMessages) return -1;

  // If only b has no messages, it should come first
  if (bHasNoMessages) return 1;

  const mostRecentA = sortMessagesByDateDescending(a.messages)[0];
  const mostRecentB = sortMessagesByDateDescending(b.messages)[0];
  return compareMessagesByTimeCreated(mostRecentA, mostRecentB);
};

export const selectActiveFolder = createSelector(
  selectChatState,
  ({ activeFolder }) => activeFolder,
);

export const selectIsDefaultFolder = createSelector(
  selectActiveFolder,
  activeFolder => activeFolder === 'ok',
);

export const selectIsArchivedFolder = createSelector(
  selectActiveFolder,
  activeFolder => activeFolder === 'ok',
);

export const selectChats = createSelector(
  selectChatState,
  ({ activeFolder, chats }) =>
    Object.values(chats)
      .filter(chat => chat.status === activeFolder)
      .sort(sortChats),
);

export const selectHasBeenChatting = createSelector(
  selectChatState,
  ({ chats }) => Object.values(chats).length > 0,
);

export const selectOngoingChatsExist = createSelector(
  selectChatState,
  ({ chats }) => Object.values(chats).some(chat => chat.status === 'ok'),
);

export const selectActiveChat = createSelector(
  selectChatState,
  ({ activeChatId, chats }) => {
    if (activeChatId) return chats[activeChatId];

    // Returns most recent unread chat, or the most recent if all are read
    const unreadChats = Object.values(chats).filter(chat => {
      if (chat.status !== 'ok') return false;
      return chat.messages.some(message => !message.opened);
    });

    return unreadChats[0] ?? Object.values(chats)[0];
  },
);

export const selectActiveChatExists = createSelector(
  selectChatState,
  ({ activeChatId, chats }) => Boolean(activeChatId && chats[activeChatId]),
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

export const selectHasUnreadMessages = createSelector(
  selectChatState,
  ({ chats }): boolean =>
    Object.values(chats)
      .filter(chat => chat.status === 'ok')
      .flatMap(chat => chat.messages)
      .some(message => !message.opened),
);

const defaultParam: PollingParam = { type: 'New', previousMsgId: '' };
export const selectCurrentPollingParams = createSelector(
  selectChatState,
  ({ pollingParams }) => {
    if (!pollingParams) return null;
    if (pollingParams.length === 0) return defaultParam;
    return pollingParams[0];
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
