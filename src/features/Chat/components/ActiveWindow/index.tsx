import { useState } from 'react';

import {
  ChatFolder,
  useSendMessageMutation,
  toSendMessage,
  useUpdateStatusMutation,
} from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import {
  selectActiveChat,
  selectIsLoadingBuddyMessages,
} from '@/features/Chat/chatSlice';
import { selectUserId } from '@/features/Authentication/userSlice';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import ArchivedIcon from '@/static/icons/archived-chats.svg';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { IconButton, StatusButton } from '@/components/Buttons';
import { MessageList } from './MessageList';

const searchInputIconSize = 24;
const closeInputIconSize = 34;

const ActiveWindow = () => {
  const { t } = useTranslation('chat');
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [text, setText] = useState('');
  const [sendMessage, { isLoading: isMessageSendLoading }] =
    useSendMessageMutation();
  const [updateChatStatus] = useUpdateStatusMutation();
  const userId = useAppSelector(selectUserId);

  const chat = useAppSelector(selectActiveChat);
  const isLoadingMessages = useAppSelector(
    selectIsLoadingBuddyMessages(chat?.buddyId),
  );

  const updateStatus = (status: ChatFolder) => {
    if (!userId || !chat) return;
    updateChatStatus({ userId, buddyId: chat.buddyId, status });
  };

  const handleMessageSend = (buddyId: string, text: string) => {
    if (!userId || isMessageSendLoading) return;

    const message = toSendMessage(buddyId, userId, text);
    sendMessage({ userId, message });
    setText('');
  };

  const isLoading = isLoadingMessages || isMessageSendLoading;

  const icons = {
    ok: <ProfileIcon color="purpleDark" />,
    archived: <img src={ArchivedIcon} />,
    banned: <img src={BlockedIcon} />,
  };

  return (
    chat && (
      <Container>
        <HeaderBar>
          <ProfileInfo>
            {icons[chat.status]}
            <MentorName variant="h2">{chat.displayName}</MentorName>
            <MentorBio variant="p">{chat.status}</MentorBio>
          </ProfileInfo>
          {showSearch ? (
            <SearchBar>
              <SearchInput
                variant="iconInput"
                color={searchValue ? 'blueDark' : 'greyFaded'}
                leftIcon={{
                  sizeInPx: searchInputIconSize,
                  variant: 'search',
                }}
                rightButton={{
                  onClick: () => setShowSearch(false),
                  sizeInPx: closeInputIconSize,
                  variant: 'closeWithBackground',
                }}
                onChange={setSearchValue}
                placeholder={t('header.search')}
                value={searchValue}
              />
            </SearchBar>
          ) : (
            <Buttons>
              <IconButton
                variant="search"
                sizeInPx={24}
                onClick={() => setShowSearch(true)}
              />
              {chat.status === 'ok' ? (
                <>
                  <StatusButton
                    onClick={() => updateStatus('archived')}
                    icon="archive"
                    text={t('header.archive')}
                  />
                  <StatusButton
                    onClick={() => updateStatus('banned')}
                    icon="block"
                    text={t('header.block')}
                  />
                </>
              ) : (
                <StatusButton
                  onClick={() => updateStatus('ok')}
                  icon="return"
                  text={t('header.restore')}
                />
              )}
            </Buttons>
          )}
        </HeaderBar>
        <MessageList
          messageList={chat.messages}
          buddyId={chat.buddyId}
          status={chat.status}
          isLoading={isLoading}
        />
        <MessageField>
          <Input
            variant="textarea"
            color={text ? 'blueDark' : 'greyFaded'}
            onChange={setText}
            placeholder={t('input.placeholder')}
            value={text}
          />
          <SendButton
            variant="send"
            sizeInPx={46}
            onClick={() => handleMessageSend(chat.buddyId, text)}
          />
        </MessageField>
      </Container>
    )
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
`;

const HeaderBar = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: 80px;
  justify-content: space-between;
  min-width: 800px;
  padding: 14px 40px;
`;

const ProfileInfo = styled.div`
  align-items: center;
  display: flex;
`;

const MentorName = styled(Text)`
  display: block;
  padding-left: 20px;
  padding-right: 30px;
  white-space: nowrap;
`;

const MentorBio = styled(Text)`
  display: block;
  white-space: nowrap;
`;

const SearchBar = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: -${searchInputIconSize}px;
  margin-right: -${closeInputIconSize}px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  max-width: 400px;
  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

const Buttons = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

const MessageField = styled.div`
  align-items: center;
  display: flex;
`;

const Input = styled(TextInput)`
  box-sizing: border-box;
  flex: 1;
  height: 80px;
  margin: 20px 1.25rem 20px 40px;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

const SendButton = styled(IconButton)`
  margin-right: 1.25rem;
`;

export default ActiveWindow;
