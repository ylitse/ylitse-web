import styled from 'styled-components';
import { palette } from '@/components/variables';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import IconButton from '@/components/Buttons/IconButton';
import BackArrowIcon from '@/static/icons/back-arrow.svg';
import Text from '@/components/Text';

const ChatMenu = () => {
  const { t } = useTranslation('chat');
  const [chatTypeMenuOpen, setChatTypeMenuOpen] = useState(false);
  type ChatType = 'chat' | 'archived' | 'blocked';
  const [chatType, setChatType] = useState<ChatType>('chat');
  const [chats, setChats] = useState([]);

  return (
    <Container>
      <ChatMenuRow>
        <Header variant="h1">
          {chatType === 'chat'
            ? t('menu.title.chats')
            : chatType === 'archived'
            ? t('menu.title.archived')
            : t('menu.title.blocked')}
        </Header>
        <Buttons>
          {!!chats.length && (
            <IconButton
              variant="search"
              sizeInPx={40}
              onClick={() => console.log('searching...')}
            />
          )}
          <IconButton
            variant="menuLines"
            sizeInPx={40}
            onClick={() => setChatTypeMenuOpen(!chatTypeMenuOpen)}
          />
        </Buttons>
      </ChatMenuRow>
      {(chatTypeMenuOpen ||
        chatType === 'archived' ||
        chatType === 'blocked') && (
        <ChatMenuRow>
          <MenuBackLink
            onClick={() => {
              setChatType('chat');
              setChatTypeMenuOpen(false);
            }}
          >
            <MenuBackIcon src={BackArrowIcon} />
            <MenuBackLinkText color="purple" variant="chatMenuLink">
              {t('menu.back')}
            </MenuBackLinkText>
          </MenuBackLink>
        </ChatMenuRow>
      )}
      {chatTypeMenuOpen ? (
        <>
          <ChatMenuRow>
            <ChatTypeLink
              onClick={() => {
                setChatType('archived');
                setChatTypeMenuOpen(false);
              }}
            >
              <MenuBackLinkText color="purple" variant="chatMenuLink">
                {t('menu.archived')}
              </MenuBackLinkText>
            </ChatTypeLink>
          </ChatMenuRow>
          <ChatMenuRow>
            <ChatTypeLink
              onClick={() => {
                setChatType('blocked');
                setChatTypeMenuOpen(false);
              }}
            >
              <MenuBackLinkText color="purple" variant="chatMenuLink">
                {t('menu.blocked')}
              </MenuBackLinkText>
            </ChatTypeLink>
          </ChatMenuRow>
        </>
      ) : chats.length ? (
        <ChatList></ChatList>
      ) : (
        <EmptyMenuText variant="p">
          {chatType === 'chat'
            ? t('menu.empty.chats')
            : chatType === 'archived'
            ? t('menu.empty.archived')
            : t('menu.empty.blocked')}
        </EmptyMenuText>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 407px;
  height: 780px;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
`;

const ChatMenuRow = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${palette.lightgrey};
`;

const MenuBackLink = styled.a`
  display: flex;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  cursor: pointer;
`;

const MenuBackLinkText = styled(Text)``;

const MenuBackIcon = styled.img`
  padding-right: 20px;
  cursor: pointer;
`;

const ChatTypeLink = styled.a`
  padding-left: 40px;
  cursor: pointer;
`;

const Header = styled(Text)`
  flex: 1;
  color: ${palette.darkblue};
  padding-left: 40px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 25px;
  padding-right: 30px;
`;

const ChatList = styled.div``;

const EmptyMenuText = styled(Text)`
  margin: 0;
  color: ${palette.darkblue};
  padding-top: 1.25rem;
  padding-left: 40px;
  padding-right: 40px;
`;

export default ChatMenu;
