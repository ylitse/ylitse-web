import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store';
import { ChatFolder, selectChats, setActiveFolder } from '../chatSlice';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import BackArrowIcon from '@/static/icons/back-arrow.svg';
import { palette } from '@/components/variables';
import IconButton from '@/components/Buttons/IconButton';
import Text from '@/components/Text';
import ChatMenuItem from './ChatMenuItem';

const ChatMenu = () => {
  const { t } = useTranslation('chat');
  const [showCategories, setShowCategories] = useState(false);

  const activeFolder = useAppSelector(state => state.chats.activeFolder);
  const chats = useAppSelector(selectChats);
  const dispatch = useAppDispatch();

  const changeActiveFolder = (folder: ChatFolder) => {
    dispatch(setActiveFolder(folder));
  };

  return (
    <Container>
      <HeaderRow>
        <Header variant="h1">{t(`menu.title.${activeFolder}`)}</Header>
        <Buttons>
          {!!chats.length && (
            <IconButton
              variant="searchWithBackground"
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
      </HeaderRow>

      {showCategories ||
        (['archived', 'banned'].includes(activeFolder) && (
          <Row
            onClick={() => {
              changeActiveFolder('ok');
              setShowCategories(false);
            }}
          >
            <GoBackLink>
              <GoBackIcon src={BackArrowIcon} />
              <Text variant="boldBaloo" color="purple">
                {t('menu.back')}
              </Text>
            </GoBackLink>
          </Row>
        ))}

      {showCategories ? (
        <>
          <Row
            onClick={() => {
              changeActiveFolder('archived');
              setShowCategories(false);
            }}
          >
            <FolderLink>
              <Text variant="boldBaloo" color="purple">
                {t('menu.archived')}
              </Text>
            </FolderLink>
          </Row>
          <Row
            onClick={() => {
              changeActiveFolder('banned');
              setShowCategories(false);
            }}
          >
            <FolderLink>
              <Text variant="boldBaloo" color="purple">
                {t('menu.banned')}
              </Text>
            </FolderLink>
          </Row>
        </>
      ) : chats.length ? (
        <>
          {chats.map(buddy => {
            return <ChatMenuItem buddy={buddy} key={buddy.buddyId} />;
          })}
        </>
      ) : (
        <EmptyText>{t(`menu.empty.${activeFolder}`)}</EmptyText>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  flex: 0 0 400px;
  overflow: auto;
`;

const HeaderRow = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-left: 40px;
`;

const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-left: 40px;

  &:hover {
    background-color: ${palette.blueWhite};
  }
`;

const GoBackLink = styled.a`
  align-items: center;
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
`;

const GoBackIcon = styled.img`
  padding-right: 20px;
`;

const FolderLink = styled.a`
  padding-left: 40px;
`;

const Header = styled(Text)`
  flex: 1;
`;

const Buttons = styled.div`
  display: flex;
  gap: 25px;
  padding-right: 30px;
`;

const EmptyText = styled(Text)`
  margin: 0;
  padding: 1.25rem 2rem;
`;

export default ChatMenu;
