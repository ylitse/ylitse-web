import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { palette } from '@/components/variables';
import styled from 'styled-components';
import { TruncateText, WrappedText } from '../Expanded/BasicInfo';
import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderForMe from '@/static/icons/chat-profilepic-me.svg';
import { Text } from '@/components/Text/Text';
import { Tag, type Status } from './Tag';

type Props = {
  name: string;
  age: number;
  region: string;
  isAvailable: boolean;
  isMe: boolean;
  isNew: boolean;
  message: string;
};

export const Header: React.FC<Props> = ({
  name,
  age,
  region,
  isAvailable,
  isMe,
  isNew,
  message,
}) => {
  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  const getStatus = (
    isMe: boolean,
    isAvailable: boolean,
    isNew: boolean,
  ): Status => {
    if (isMe) {
      return 'me';
    }
    if (!isAvailable) {
      return 'unavailable';
    }
    if (isNew) {
      return 'new';
    }
    return 'empty';
  };

  return (
    <Container isAvailable={isAvailable} isMobile={isMobile} isMe={isMe}>
      <Tag status={getStatus(isMe, isAvailable, isNew)}></Tag>
      <ProfilePicture isMe={isMe} />
      <BasicInfo>
        <NameText variant="h2" color={isMe ? 'blueDark' : 'white'}>
          {name}
        </NameText>
        <WrappedText color={isMe ? 'blueDark' : 'white'}>
          {age} {t('card.age')} <Divider>|</Divider>
          {region}
        </WrappedText>
        <TruncateText color={isMe ? 'blueDark' : 'white'}>
          {message}
        </TruncateText>
      </BasicInfo>
    </Container>
  );
};

const Container = styled.div<{
  isAvailable: boolean;
  isMobile: boolean;
  isMe: boolean;
}>`
  align-items: center;
  background-color: ${({ isAvailable, isMe }) => {
    if (!isAvailable) {
      return palette.blueGrey;
    }
    if (isMe) {
      return palette.blue;
    } else {
      return palette.purple;
    }
  }};
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: ${palette.white};
  display: flex;
  flex: 0 0 auto;
  height: 7.5rem;
  max-height: 7.5rem;
  padding: ${({ isMobile }) => (isMobile ? '1rem' : '1.9rem')};
  position: relative;
  width: 100%;
`;

const ProfilePicture = styled.div<{ isMe: boolean }>`
  background-image: ${({ isMe }) =>
    `url(${isMe ? ProfilePicPlaceholderForMe : ProfilePicPlaceholder})`};
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 4rem;
  height: 4rem;
  width: 4rem;
`;

const NameText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BasicInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  max-width: calc(100% - 3.8rem);
  padding-left: 1.9rem;
`;

const Divider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;
