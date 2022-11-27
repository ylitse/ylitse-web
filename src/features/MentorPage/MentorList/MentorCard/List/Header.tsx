import styled from 'styled-components';
import * as cssVariables from '../../../../../components/variables';
import ProfilePicPlaceholder from '../../../../../static/img/icon-chat-profilepic.svg';
import { WrappedText, TruncateText } from '../Expanded/BasicInfo';
import { Text } from '../../../../../components/Text/Text';

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
  const availabilityMessage = isAvailable ? '' : 'Ei tavoitettavissa';

  return (
    <StyledHeader isAvailable={isAvailable}>
      <Availability isShowing={!isAvailable}>
        {availabilityMessage}
      </Availability>
      <ProfilePicture />
      <BasicInfo>
        <Text color="white" variant="h2">
          {name}
        </Text>
        <WrappedText color="white" variant="p">
          {age} v. <StyledDivider>|</StyledDivider> {region}
        </WrappedText>
        <Text color="white" variant="p">
          {isAvailable}
        </Text>
        <TruncateText>{message}</TruncateText>
      </BasicInfo>
    </StyledHeader>
  );
};

const StyledHeader = styled.div<{ isAvailable: boolean }>`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 7.5rem;
  max-height: 7.5rem;
  background-color: ${props =>
    props.isAvailable
      ? cssVariables.palette.purple
      : cssVariables.palette.bluegrey};
  color: ${cssVariables.palette.white};
  border-radius: 0.75rem;
  padding: 1.9rem;
  box-sizing: border-box;
  position: relative;
  max-width: calc(
    ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 3) -
      (${cssVariables.spacing.layout_spacing} * 2)
  );
  @media screen and (min-width: 2100px) {
    max-width: calc(
      ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 4) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (min-width: 2550px) {
    max-width: calc(
      ((76vw + ${cssVariables.spacing.layout_spacing} * 2) / 5) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (max-width: 1500px) {
    max-width: calc(
      ((1130px + (${cssVariables.spacing.layout_spacing} * 2)) / 3) -
        (${cssVariables.spacing.layout_spacing} * 2)
    );
  }
  @media screen and (max-width: 1194px) {
    max-width: calc((100vw / 3) - (${cssVariables.spacing.layout_spacing} * 2));
  }
  @media screen and (max-width: 900px) {
    max-width: calc((100vw / 2) - (${cssVariables.spacing.layout_spacing} * 2));
  }
`;

const ProfilePicture = styled.div`
  background-image: url(${ProfilePicPlaceholder});
  width: 3.75rem;
  height: 3.75rem;
  background-size: contain;
  background-repeat: no-repeat;
  flex: 0 0 3.75rem;
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

const Availability = styled.div<{ isShowing: boolean }>`
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${cssVariables.palette.whiteblue};
  color: ${cssVariables.palette.darkblue};
  position: absolute;
  top: 0;
  right: 0;
  ${cssVariables.basicSourceSansText};
  font-weight: 600;
  font-size: 1rem;
  line-height: 150%;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  transform: translate(-1rem, -50%);
`;
