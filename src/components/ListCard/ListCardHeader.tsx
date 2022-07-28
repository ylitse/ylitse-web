import styled from 'styled-components';
import * as cssVariables from '../../static/styles/variables';
import ProfilePicPlaceholder from '../../static/img/icon-chat-profilepic.svg';
import CSS from 'csstype';

type ListCardHeaderProps = {
  name: string;
  age: number;
  region: string;
  availability: boolean;
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
  width: 'calc(24vw - 9.45rem)',
};

const ListCardHeader: React.FC<ListCardHeaderProps> = ({
  name,
  age,
  region,
  availability,
  message,
}) => {
  return (
    <StyledListCardHeader>
      <ProfilePicContainer />
      <BasicInfoContainer>
        <cssVariables.heading2_white style={{ margin: 0 }}>
          {name}
        </cssVariables.heading2_white>
        <cssVariables.paragraph_white style={customStylus}>
          {age} v. <StyledDivider>|</StyledDivider> {region}
        </cssVariables.paragraph_white>
        <cssVariables.paragraph_white style={{ margin: 0 }}>
          {availability}
        </cssVariables.paragraph_white>
        <cssVariables.paragraph_white title={message} style={truncateText}>
          {message}
        </cssVariables.paragraph_white>
      </BasicInfoContainer>
    </StyledListCardHeader>
  );
};

const StyledListCardHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 7.5rem;
  width: 24vw;
  background-color: ${cssVariables.palette.purple};
  color: white;
  border-radius: 0.75rem;
  padding: 1.9rem;
  box-sizing: border-box;
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
  flex: 0 0 auto;
  box-sizing: border-box;
`;

const StyledDivider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default ListCardHeader;
