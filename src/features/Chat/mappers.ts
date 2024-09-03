import type { AppMessage, MessageResponse, Buddy } from './chatPageApi';
import { sortByCreated } from './chatPageApi';

export type Conversation = {
  name: string;
  buddyId: string;
};

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

export const toNewBuddy = ({ name, buddyId }: Conversation): ChatBuddy => ({
  displayName: name,
  buddyId,
  role: 'mentor',
  status: 'ok',
  messages: [],
});

export const createBuddyChunks = (
  buddyIds: Array<string>,
): Array<PollingParam> => {
  const chunkSize = 40;
  const amountOfBatches = Math.ceil(buddyIds.length / chunkSize);

  return [...Array(amountOfBatches).keys()]
    .map(index => buddyIds.slice(index * chunkSize, (index + 1) * chunkSize))
    .map(chunk => ({ type: 'InitialMessages', buddyIds: chunk }));
};

export const mergeMessages = (
  originalChats: Record<string, ChatBuddy>,
  response: MessageResponse,
) =>
  response.buddies.reduce((chats, contact) => {
    const newMessages = response.messages.filter(
      ({ buddyId }) => buddyId === contact.buddyId,
    );
    const existingBuddy = originalChats[contact.buddyId];
    const existingMessages = existingBuddy ? existingBuddy.messages : [];

    return {
      ...chats,
      [contact.buddyId]: {
        ...contact,
        messages: existingMessages.concat(newMessages).sort(sortByCreated),
      },
    };
  }, originalChats);

export const getNextParams = (
  pollingQueue: Array<PollingParam> | null,
  previousMsgId: string,
): Array<PollingParam> => {
  const normalPoll = { type: 'New', previousMsgId } as PollingParam;
  const params = pollingQueue?.filter((_p, i) => i !== 0);

  if (params?.length === 0) {
    return [normalPoll];
  }

  return params ?? [normalPoll];
};

export const getParamsForUnreadMessages = (
  messages: Array<AppMessage>,
  params: Array<PollingParam> | null,
): Array<PollingParam> => {
  if (!params || params?.length === 0) {
    return [];
  }

  const param = params[0];
  switch (param.type) {
    case 'OlderThan': {
      return getOlderThanParamsIfHasUnread(messages)(param.buddyId);
    }

    case 'InitialMessages': {
      return param.buddyIds.flatMap(getOlderThanParamsIfHasUnread(messages));
    }

    default: {
      return [];
    }
  }
};

export const getOlderThanParamsIfHasUnread =
  (messages: Array<AppMessage>) =>
  (buddyId: string): Array<PollingParam> => {
    const buddyMessages = messages.filter(
      message => message.buddyId === buddyId,
    );
    const hasUnread = buddyMessages.some(message => !message.opened);

    return hasUnread
      ? [{ type: 'OlderThan', buddyId, messageId: buddyMessages[0].id }]
      : [];
  };
