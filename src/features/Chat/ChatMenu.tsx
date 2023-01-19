import styled from 'styled-components';
import { palette } from '@/components/variables';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import IconButton from '@/components/Buttons/IconButton';

const ChatMenu = () => {
  const { t } = useTranslation();
  const [chats, setChats] = useState([]);

  return (
    <Container>
      <Toolbar>
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
            onClick={() => console.log('opening...')}
          />
        </Buttons>
      </Toolbar>
      {chats.length ? (
        <Chats></Chats>
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

const Toolbar = styled.div`
  height: 77px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${palette.lightgrey};
`;

const Header = styled.h1`
  flex: 1;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 48px;
  color: ${palette.darkblue};
  padding-left: 39px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 25px;
  padding-right: 31px;
`;

const Chats = styled.div``;

const EmptyMenuText = styled.div`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: ${palette.darkblue};
  padding-top: 23px;
  padding-left: 38px;
  padding-right: 53px;
`;

export default ChatMenu;
