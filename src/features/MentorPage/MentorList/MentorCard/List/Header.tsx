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
      <Availability variant="pSpan" isShowing={!isAvailable}>
        {availabilityMessage}
      </Availability>
      <ProfilePicture />
      <BasicInfo>
        <NameText color="white" variant="h2">
          {name}
        </NameText>
        <WrappedText color="white" variant="p">
          {age} {t('card.age')} <StyledDivider>|</StyledDivider>
          {region}
        </WrappedText>
        <TruncateText color="white">{message}</TruncateText>
      </BasicInfo>
    </StyledHeader>
  );
};

const NameText = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledHeader = styled.div<{ isAvailable: boolean }>`
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 7.5rem;
  max-height: 7.5rem;
  background-color: ${props =>
    props.isAvailable ? palette.purple : palette.bluegrey};
  color: ${palette.white};
  border-radius: 0.75rem;
  padding: 1.9rem;
  box-sizing: border-box;
`;

const ProfilePicture = styled.div`
  background-image: url(${ProfilePicPlaceholder});
  width: 4rem;
  height: 4rem;
  background-size: contain;
  background-repeat: no-repeat;
  flex: 0 0 4rem;
`;

const BasicInfo = styled.div`
  padding-left: 1.9rem;
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  max-width: calc(100% - 3.8rem);
  box-sizing: border-box;
`;

const StyledDivider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Availability = styled(Text)<{ isShowing: boolean }>`
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${palette.whiteblue};
  color: ${palette.darkblue};
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  transform: translate(-1rem, -50%);
`;
