import styled from 'styled-components';
import { ListCardProps } from '../ListCard/types';
import { Text } from '../../../components/CommonTextStyles/Text';
import CSS from 'csstype';
import MentorCardLanguages from './MentorCardLanguages';
import * as cssVariables from '../../../components/variables';

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
  color: cssVariables.palette.white,
  textAlign: 'center',
};

const MentorCardHeaderBasicInfo = ({ mentorCardData }: Props) => {
  return (
    <BasicInfoContainer>
      <Text color="white" variant="h2" style={{ margin: 0 }}>
        {mentorCardData.name}
      </Text>
      <NameDivider />
      <Text color="white" variant="p" style={customStylus}>
        {mentorCardData.age} v. <StyledDivider>|</StyledDivider>{' '}
        {mentorCardData.region}
      </Text>
      <Text color="white" variant="p" style={{ margin: 0 }}>
        {!mentorCardData.is_vacationing}
      </Text>
      <p title={mentorCardData.status_message} style={truncateText}>
        {mentorCardData.status_message}
      </p>
      <MentorCardLanguages languages={mentorCardData.languages} />
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
  border-bottom: 1px solid ${cssVariables.palette.white};
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StyledDivider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default MentorCardHeaderBasicInfo;
