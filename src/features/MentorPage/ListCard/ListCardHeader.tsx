import styled from 'styled-components';
import * as cssVariables from '../../../components/variables';
import ProfilePicPlaceholder from '../../../static/img/icon-chat-profilepic.svg';
import CSS from 'csstype';
import { Text } from '../../../components/CommonTextStyles/Text';

type Props = {
  name: string;
  age: number;
  region: string;
  isAvailable: boolean;
  isNewMentor: boolean;
  message: string;
};

const customStylus: CSS.Properties = {
  margin: '0px',
  display: 'flex',
  flexWrap: 'wrap',
};

const truncateText: CSS.Properties = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  margin: '0px',
  width: '100%',
  fontFamily: '"Source Sans Pro"',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: '#ffffff',
};

const ListCardHeader: React.FC<Props> = ({
  name,
  age,
  region,
  isAvailable,
  isNewMentor,
  message,
}) => {
  const newCardMessage = isNewMentor ? 'Uusi' : '';
  const availabilityMessage = isAvailable
    ? newCardMessage
    : 'Ei tavoitettavissa';
  return (
    <StyledListCardHeader isSelected={isAvailable}>
      <MentorAvailability
        isShowing={availabilityMessage != ''}
        isNew={availabilityMessage === 'Uusi'}
      >
        {availabilityMessage}
      </MentorAvailability>
      <ProfilePicContainer />
      <BasicInfoContainer>
        <Text color="white" variant="h2" style={{ margin: 0 }}>
          {name}
        </Text>
        <Text color="white" variant="p" style={customStylus}>
          {age} v. <StyledDivider>|</StyledDivider> {region}
        </Text>
        <Text color="white" variant="p" style={{ margin: 0 }}>
          {isAvailable}
        </Text>
        <p title={message} style={truncateText}>
          {message}
        </p>
      </BasicInfoContainer>
    </StyledListCardHeader>
  );
};

const StyledListCardHeader = styled.div<{ isSelected: boolean }>`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 7.5rem;
  max-height: 7.5rem;
  background-color: ${props =>
    props.isSelected
      ? cssVariables.palette.purple
      : cssVariables.palette.bluegrey};
  color: white;
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

const ProfilePicContainer = styled.div`
  background-image: url(${ProfilePicPlaceholder});
  width: 3.75rem;
  height: 3.75rem;
  background-size: contain;
  background-repeat: no-repeat;
  flex: 0 0 3.75rem;
`;

const BasicInfoContainer = styled.div`
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

const MentorAvailability = styled.div<{ isShowing: boolean; isNew: boolean }>`
  display: ${props => (props.isShowing ? `flex` : `none`)};
  background-color: ${props =>
    props.isNew ? cssVariables.palette.orange : cssVariables.palette.whiteblue};
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

export default ListCardHeader;
