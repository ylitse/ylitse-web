import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { TruncateText, WrappedText } from '../Expanded/BasicInfo';
import { palette } from '@/components/variables';
import { Text } from '@/components/Text/Text';

import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';

type Props = {
  name: string;
  age: number;
  region: string;
  isAvailable: boolean;
  message: string;
};

export const Header: React.FC<Props> = ({
  name,
  age,
  region,
  isAvailable,
  message,
}) => {
  const { t } = useTranslation('mentors');

  const availabilityMessage = isAvailable ? '' : t('card.unavailable');

  return (
    <StyledHeader isAvailable={isAvailable}>
      <Availability variant="label" isShowing={!isAvailable}>
        {availabilityMessage}
      </Availability>
      <ProfilePicture />
      <BasicInfo>
        <NameText variant="h2" color="white">
          {name}
        </NameText>
        <WrappedText color="white">
          {age} {t('card.age')} <Divider>|</Divider>
          {region}
        </WrappedText>
        <TruncateText color="white">{message}</TruncateText>
      </BasicInfo>
    </StyledHeader>
  );
};

const NameText = styled(Text)`
  margin-bottom: 0;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledHeader = styled.div<{ isAvailable: boolean }>`
  align-items: center;
  background-color: ${props =>
    props.isAvailable ? palette.purple : palette.greyBluish};
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: ${palette.white};
  display: flex;
  flex: 0 0 auto;
  height: 7.5rem;
  max-height: 7.5rem;
  padding: 1.9rem;
  position: relative;
`;

const ProfilePicture = styled.div`
  background-image: url(${ProfilePicPlaceholder});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 4rem;
  height: 4rem;
  width: 4rem;
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

const Availability = styled(Text)<{ isShowing: boolean }>`
  background-color: ${palette.whiteBluish};
  border-radius: 0.25rem;
  display: ${props => (props.isShowing ? `flex` : `none`)};
  padding: 0.25rem 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-1rem, -50%);
`;
