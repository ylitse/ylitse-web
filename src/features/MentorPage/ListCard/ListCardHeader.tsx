import styled from 'styled-components';
import * as cssVariables from '../../../components/variables';
import ProfilePicPlaceholder from '../../../static/img/icon-chat-profilepic.svg';
import CSS from 'csstype';

type Props = {
  name: string;
  age: number;
  region: string;
  available: boolean;
  newMentor: boolean;
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
};

const ListCardHeader: React.FC<Props> = ({
  name,
  age,
  region,
  available,
  newMentor,
  message,
}) => {
  let availabilityMessage = newMentor ? 'Uusi' : '';
  availabilityMessage = available ? availabilityMessage : 'Ei tavoitettavissa';
  return (
    <StyledListCardHeader isSelected={available}>
      <MentorAvailability
        isShowing={availabilityMessage != ''}
        isNew={availabilityMessage === 'Uusi'}
      >
        {availabilityMessage}
      </MentorAvailability>
      <ProfilePicContainer />
      <BasicInfoContainer>
        <cssVariables.heading2_white style={{ margin: 0 }}>
          {name}
        </cssVariables.heading2_white>
        <cssVariables.paragraph_white style={customStylus}>
          {age} v. <StyledDivider>|</StyledDivider> {region}
        </cssVariables.paragraph_white>
        <cssVariables.paragraph_white style={{ margin: 0 }}>
          {available}
        </cssVariables.paragraph_white>
        <cssVariables.paragraph_white title={message} style={truncateText}>
          {message}
        </cssVariables.paragraph_white>
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
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 150%;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  transform: translate(-1rem, -50%);
`;

export default ListCardHeader;