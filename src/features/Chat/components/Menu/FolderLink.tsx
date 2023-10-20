import { useAppDispatch } from '@/store';
import { setActiveFolder, setShowFolders } from '@/features/Chat/chatSlice';
import { useTranslation } from 'react-i18next';

import type { ChatFolder } from '@/features/Chat/chatPageApi';

import styled, { css } from 'styled-components';
import BackArrowIcon from '@/static/icons/back-arrow.svg';
import { palette } from '@/components/variables';
import { ROW_HEIGHT } from '@/features/Chat/constants';
import Text from '@/components/Text';

type Props = {
  targetFolder: ChatFolder;
};

const FolderLink = ({ targetFolder }: Props) => {
  const { t } = useTranslation('chat');

  const dispatch = useAppDispatch();

  const changeActiveFolder = (folder: ChatFolder) => {
    dispatch(setActiveFolder(folder));
  };

  const hideFolders = () => {
    dispatch(setShowFolders(false));
  };

  const isTargetActiveFolder = targetFolder === 'ok';

  return (
    <Row
      onClick={() => {
        changeActiveFolder(targetFolder);
        hideFolders();
      }}
    >
      <Link isTargetActiveFolder>
        {isTargetActiveFolder && <BackToActiveIcon src={BackArrowIcon} />}
        <Text variant="boldBaloo" color="purple">
          {isTargetActiveFolder ? t('menu.back') : t(`menu.${targetFolder}`)}
        </Text>
      </Link>
    </Row>
  );
};

const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: ${ROW_HEIGHT};
  min-height: ${ROW_HEIGHT};
  padding-left: 40px;

  &:hover {
    background-color: ${palette.blueWhite};
  }
`;

const Link = styled.a<{ isTargetActiveFolder: boolean }>`
  ${({ isTargetActiveFolder }) =>
    isTargetActiveFolder &&
    css`
      align-items: center;
      display: flex;
      padding-right: 40px;
    `}

  padding-left: 40px;
`;

const BackToActiveIcon = styled.img`
  padding-right: 20px;
`;

export default FolderLink;
