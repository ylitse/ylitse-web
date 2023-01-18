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
          onClick={() => console.log('searching...')}
        />
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
  background-color: ${palette.white};
  border-radius: 10px;
  width: 407px;
  height: 780px;
`;

const Toolbar = styled.div`
  height: 77px;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 25px;
  padding-left: 39px;
  padding-right: 31px;
  border-bottom: 1px solid ${palette.lightgrey};
`;

const Header = styled.h1`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: ${palette.darkblue};
  line-height: 48px;
  flex: 1;
`;

const Chats = styled.div``;

const EmptyMenuText = styled.div`
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: ${palette.darkblue};
  margin-top: 23px;
  margin-left: 38px;
  margin-right: 53px;
`;

export default ChatMenu;
