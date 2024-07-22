import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';

type Props = {
  isAvailable: boolean;
  isMe: boolean;
  isNew: boolean;
};

export const Tag: React.FC<Props> = ({ isAvailable, isMe, isNew }) => {
  const { t } = useTranslation('mentors');

  const statusMap = {
    me: { text: t('card.me'), color: palette.blueWhite },
    unavailable: { text: t('card.unavailable'), color: palette.blueWhite },
    new: { text: t('card.new'), color: palette.orange },
    empty: { text: '', color: '' },
  };

  type Status = 'new' | 'me' | 'unavailable' | 'empty';
  const getStatus = (
    isMe: boolean,
    isAvailable: boolean,
    isNew: boolean,
  ): Status => {
    if (isMe) {
      return 'me';
    } else if (!isAvailable) {
      return 'unavailable';
    } else if (isNew) {
      return 'new';
    }
    return 'empty';
  };

  const status = getStatus(isMe, isAvailable, isNew);
  const tagMessage = statusMap[status].text;
  const backgroundColor = statusMap[status].color;
  const needTag = isMe || !isAvailable || isNew;

  return (
    <MentorTag isShowing={needTag} backgroundColor={backgroundColor}>
      {tagMessage}
    </MentorTag>
  );
};

const MentorTag = styled(Text)<{ isShowing: boolean; backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  border-radius: 0.25rem;
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  margin: 0;
  padding: 0.25rem 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-1rem, -50%);
`;
