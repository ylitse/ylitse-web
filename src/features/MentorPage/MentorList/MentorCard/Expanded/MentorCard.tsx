import styled, { css } from 'styled-components';
import { Header } from './Header';
import { Content } from './Content';
import { IconButton } from '@/components/Buttons';
import { palette, breakpoints } from '@/components/variables';
import { Mentor } from '@/features/MentorPage/mentorPageApi';
import { useMobileMode } from '@/hooks/useMobileMode';

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
        <CloseButton
          variant="close"
          sizeInPx={38}
          onClick={onDismiss}
        ></CloseButton>
        <Content mentor={mentor} />
      </Card>
    </Container>
  );
};

const Card = styled.div<{ isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  opacity: 1;
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
          display: flex;
          height: fit-content;
          left: 50%;
          margin: auto;
          max-height: 80vh;
          min-height: 57vh;
          position: fixed;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 65vw;
        `}
`;

const Container = styled.div`
  background-color: ${palette.backgroundBlur};
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;

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
  right: 1rem;
  top: 1rem;

  @media screen and (max-width: ${breakpoints.mobile}) {
    top: 3rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
  }
`;
