import styled from 'styled-components';
import { Text } from '../../../../../components/Text/Text';
import CSS from 'csstype';
import { Languages } from './Languages';
import { Mentor } from '../../../mentorPageApi';
import * as cssVariables from '../../../../../components/variables';

type Props = {
  mentor: Mentor;
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

export const BasicInfo = ({
  mentor: { name, age, region, is_vacationing, status_message, languages },
}: Props) => {
  return (
    <Container>
      <Text color="white" variant="h2" style={{ margin: 0 }}>
        {name}
      </Text>
      <NameDivider />
      <Text color="white" variant="p" style={customStylus}>
        {age} v. <StyledDivider>|</StyledDivider> {region}
      </Text>
      <Text color="white" variant="p" style={{ margin: 0 }}>
        {!is_vacationing}
      </Text>
      <p title={status_message} style={truncateText}>
        {status_message}
      </p>
      <Languages languages={languages} />
    </Container>
  );
};

const Container = styled.div`
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
