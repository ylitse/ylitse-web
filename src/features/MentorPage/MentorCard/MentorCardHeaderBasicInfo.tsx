import styled from 'styled-components';
import { ListCardProps } from '../../../../../mentor_card/src/features/MentorPage/ListCard/types';
import { Text } from '../../../components/CommonTextStyles/Text';
import CSS from 'csstype';
import MentorCardLanguages from './MentorCardLanguages';

type Props = {
  mentorCardData: ListCardProps;
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

const MentorCardHeaderBasicInfo = ({ mentorCardData }: Props) => {
  const age = new Date().getFullYear() - mentorCardData.mentor.birthYear;
  return (
    <BasicInfoContainer>
      <Text color="white" variant="h2" style={{ margin: 0 }}>
        {mentorCardData.mentor.displayName}
      </Text>
      <NameDivider />
      <Text color="white" variant="p" style={customStylus}>
        {age} v. <StyledDivider>|</StyledDivider> {mentorCardData.mentor.region}
      </Text>
      <Text color="white" variant="p" style={{ margin: 0 }}>
        {mentorCardData.isLoggedIn}
      </Text>
      <p style={truncateText}>{mentorCardData.contactMessage}</p>
      <MentorCardLanguages languages={mentorCardData.mentor.languages} />
    </BasicInfoContainer>
  );
};

const BasicInfoContainer = styled.div`
  position: absolute;
  margin-left: 50%;
  top: 16vw;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 100%;
  max-width: 70%;
  box-sizing: border-box;
`;

const NameDivider = styled.div`
  width: 16vw;
  height: 2px;
  border-bottom: 1px solid white;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StyledDivider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default MentorCardHeaderBasicInfo;
