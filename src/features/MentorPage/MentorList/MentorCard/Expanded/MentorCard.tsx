import styled, { css } from 'styled-components';
import { Header } from './Header';
import { Content } from './Content';
import { IconButton } from '../../../../../components/Buttons';
import * as cssVariables from '../../../../../components/variables';
import { Mentor } from '../../../mentorPageApi';
import { useMobileMode } from '@/hooks/useMobileMode';
import { breakpoints } from '@/components/variables';

type Props = {
  onDismiss: () => void;
  mentor: Mentor;
};

export const MentorCard = ({ mentor, onDismiss }: Props) => {
  const isMobile = useMobileMode();

  return (
    <Container>
      <Card isMobile={isMobile}>
        <Header mentor={mentor} />
        <CloseButton variant="close" onClick={onDismiss}></CloseButton>
        <Content mentor={mentor} />
      </Card>
    </Container>
  );
};

const Card = styled.div<{ isMobile: boolean }>`
  background-color: ${cssVariables.palette.white};
  opacity: 1;
  border-radius: 10px;
  z-index: 100;

  ${({ isMobile }) =>
    isMobile
      ? css`
          display: flex;
          flex: 1;
          flex-direction: column;
          margin: 2rem;
        `
      : css`
          position: fixed;
          display: flex;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: auto;
          width: 65vw;
          min-height: 57vh;
          height: fit-content;
          max-height: 80vh;
        `}
`;

const Container = styled.div`
  background-color: ${cssVariables.palette.blurbackground};
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  @media screen and (max-width: ${breakpoints.mobile}) {
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  @media screen and (max-width: ${breakpoints.mobile}) {
    top: 3rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
  }
`;
