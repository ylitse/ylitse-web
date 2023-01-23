import styled from 'styled-components';
import { basicSourceSansText, palette } from '@/components/variables';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import IconButton from '@/components/Buttons/IconButton';
import BackArrowIcon from '@/static/icons/back-arrow.svg';

const ChatMenu = () => {
  const { t } = useTranslation();
  const [chatTypeMenuOpen, setChatTypeMenuOpen] = useState(false);
  const [chats, setChats] = useState([]);

  return (
    <Container>
      <ChatMenuRow>
        <Header>{t('chatPage.menu.title')}</Header>
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
            onClick={() => setChatTypeMenuOpen(true)}
          />
        </Buttons>
      </ChatMenuRow>
      {chatTypeMenuOpen ? (
        <>
          <ChatMenuRow>
            <MenuBackLink>
              <BackArrowIcon />
              {t('chatPage.menu.back')}
            </MenuBackLink>
          </ChatMenuRow>
          <ChatMenuRow>
            <ChatTypeLink>{t('chatPage.menu.archived')}</ChatTypeLink>
          </ChatMenuRow>
          <ChatMenuRow>
            <ChatTypeLink>{t('chatPage.menu.blocked')}</ChatTypeLink>
          </ChatMenuRow>
        </>
      ) : chats.length ? (
        <ChatList></ChatList>
      ) : (
        <EmptyMenuText>{t('chatPage.menu.empty')}</EmptyMenuText>
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
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${palette.lightgrey};
`;

const MenuBackLink = styled.a`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: ${palette.purple};
  padding-left: 40px;
`;

const ChatTypeLink = styled.a`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  color: ${palette.purple};
  padding-left: 40px;
`;

const Header = styled.h1`
  flex: 1;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 48px;
  color: ${palette.darkblue};
  padding-left: 40px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 25px;
  padding-right: 31px;
`;

const ChatList = styled.div``;

const EmptyMenuText = styled.div`
  ${basicSourceSansText}
  line-height: 27px;
  color: ${palette.darkblue};
  padding-top: 23px;
  padding-left: 38px;
  padding-right: 53px;
`;

export default ChatMenu;
