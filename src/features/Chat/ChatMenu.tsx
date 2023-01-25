import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import BackArrowIcon from '@/static/icons/back-arrow.svg';

import IconButton from '@/components/Buttons/IconButton';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

type ChatCategory = 'active' | 'archived' | 'blocked';

const ChatMenu = () => {
  const { t } = useTranslation('chat');
  const [showCategories, setShowCategories] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<ChatCategory>('active');
  const chats = [];

  return (
    <Container>
      <Row>
        <Header variant="h1">
          {currentCategory === 'active' && t('menu.title.chats')}
          {currentCategory === 'archived' && t('menu.title.archived')}
          {currentCategory === 'blocked' && t('menu.title.blocked')}
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
            onClick={() => setShowCategories(!showCategories)}
          />
        </Buttons>
      </Row>

      {(showCategories ||
        currentCategory === 'archived' ||
        currentCategory === 'blocked') && (
        <Row>
          <GoBackLink
            onClick={() => {
              setCurrentCategory('active');
              setShowCategories(false);
            }}
          >
            <GoBackIcon src={BackArrowIcon} />
            <Text color="purple" variant="bold">
              {t('menu.back')}
            </Text>
          </GoBackLink>
        </Row>
      )}

      {showCategories ? (
        <>
          <Row>
            <CategoryLink
              onClick={() => {
                setCurrentCategory('archived');
                setShowCategories(false);
              }}
            >
              <Text color="purple" variant="bold">
                {t('menu.archived')}
              </Text>
            </CategoryLink>
          </Row>
          <Row>
            <CategoryLink
              onClick={() => {
                setCurrentCategory('blocked');
                setShowCategories(false);
              }}
            >
              <Text color="purple" variant="bold">
                {t('menu.blocked')}
              </Text>
            </CategoryLink>
          </Row>
        </>
      ) : chats.length ? (
        <ChatList></ChatList>
      ) : (
        <CategoryEmptyText variant="p">
          {currentCategory === 'active' && t('menu.empty.chats')}
          {currentCategory === 'archived' && t('menu.empty.archived')}
          {currentCategory === 'blocked' && t('menu.empty.blocked')}
        </CategoryEmptyText>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  height: 780px;
  width: 407px;
`;

const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.lightgrey};
  display: flex;
  flex-direction: row;
  height: 80px;
`;

const GoBackLink = styled.a`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
`;

const GoBackIcon = styled.img`
  cursor: pointer;
  padding-right: 20px;
`;

const CategoryLink = styled.a`
  cursor: pointer;
  padding-left: 40px;
`;

const Header = styled(Text)`
  color: ${palette.darkblue};
  flex: 1;
  padding-left: 40px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 25px;
  padding-right: 30px;
`;

const ChatList = styled.div``;

const CategoryEmptyText = styled(Text)`
  color: ${palette.darkblue};
  margin: 0;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 1.25rem;
`;

export default ChatMenu;
