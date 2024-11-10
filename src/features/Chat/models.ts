import * as D from 'io-ts/Decoder';
import { pipe } from 'fp-ts/lib/function';
import { role } from '../Authentication/models';

const status = D.literal('banned', 'archived', 'ok', 'deleted');

const optionalProperties = D.partial({
  status: status,
});
const mandatoryProperties = D.struct({
  display_name: D.string,
  id: D.string,
  role: role,
});

const contactCodec = pipe(mandatoryProperties, D.intersect(optionalProperties));

export const contactsResponseCodec = D.struct({
  resources: D.array(contactCodec),
});

const messageData = D.struct({
  content: D.string,
  opened: D.boolean,
  recipient_id: D.string,
  sender_id: D.string,
});

const messageDetails = D.struct({
  id: D.string,
  created: D.string,
});

const messageCodec = pipe(messageData, D.intersect(messageDetails));

export const messagesResponseCodec = D.struct({
  resources: D.array(messageCodec),
  contacts: D.array(contactCodec),
});

export type MessageData = D.TypeOf<typeof messageData>;
export type Message = D.TypeOf<typeof messageCodec>;
export type AppMessage = {
  isSent: boolean;
  id: string;
  content: string;
  opened: boolean;
  created: string;
  buddyId: string;
};

type ChatStatus = D.TypeOf<typeof status>;
export type ChatFolder = Exclude<ChatStatus, 'deleted'>;

export type Contact = D.TypeOf<typeof contactCodec>;
export type Buddy = Omit<Contact, 'display_name' | 'id' | 'status'> & {
  buddyId: string;
  displayName: string;
  status: ChatFolder;
};

export type MessageResponse = {
  messages: Array<AppMessage>;
  buddies: Array<Buddy>;
};
