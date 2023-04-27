// TODO: Replace this with a hook that returns the current user's id
const fetchCurrentUserId = async (): Promise<string> => {
  const response = await fetch('/api/myuser');
  if (response.ok) {
    const user = await response.json();
    return user['user']['id'];
  } else {
    throw new Error('Failed to fetch user');
  }
};

export const fetchContacts = async () => {
  const userId: string = await fetchCurrentUserId();
  const contactData = await fetch(`api/users/${userId}/contacts`);
  if (contactData.ok) {
    const contactsDataJson = await contactData.json();
    const contacts = contactsDataJson['resources'];
    return contacts;
  } else {
    throw new Error('Failed to fetch contacts');
  }
};

export const fetchMessages = async (contacts: { id: string }[]) => {
  const MAX_MESSAGES_AT_ONCE = 20;

  const userId = await fetchCurrentUserId();
  const contactIds = contacts.map(({ id }) => id).join(',');
  const messagesData = await fetch(
    `api/users/${userId}/messages?contact_user_ids=${contactIds}&max=${MAX_MESSAGES_AT_ONCE}&desc=true`,
  );
  if (messagesData.ok) {
    const messagesDataJson = await messagesData.json();
    const messages = messagesDataJson['resources'];
    return messages;
  } else {
    throw new Error('Failed to fetch messages');
  }
};
