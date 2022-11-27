import styled from 'styled-components';
import { Text } from '../../../../../components/Text/Text';
import { Languages } from './Languages';
import { Mentor } from '../../../mentorPageApi';
import * as cssVariables from '../../../../../components/variables';

type Props = {
  mentor: Mentor;
};

export const BasicInfo = ({
  mentor: { name, age, region, is_vacationing, status_message, languages },
}: Props) => {
  return (
    <Container>
      <Text color="white" variant="h2">
        {name}
      </Text>
      <NameDivider />
      <WrappedText color="white" variant="p">
        {age} v. <StyledDivider>|</StyledDivider> {region}
      </WrappedText>
      <Text color="white" variant="p">
        {!is_vacationing}
      </Text>
      <TruncateText>{status_message}</TruncateText>
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

export const WrappedText = styled(Text)`
  margin: 0px;
  display: flex;
  flexwrap: wrap;
`;

export const TruncateText = styled(Text)`
  textoverflow: ellipsis;
  whitespace: nowrap;
  overflow: hidden;
  margin: 0px;
  width: 100%;
  fontfamily: 'Source Sans Pro';
  fontstyle: normal;
  fontweight: 400;
  fontsize: 1rem;
  lineheight: 1.5rem;
  color: ${cssVariables.palette.white};
  textalign: center;
`;
