import { useComponentVisible } from '@/hooks/useComponentShow';

import { palette } from '@/components/variables';
import styled, { keyframes } from 'styled-components';
import Text from '@/components/Text';
import { Chevron } from '@/components/Icons/Chevron';

export const PageSizeDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);

  return (
    <Container>
      <Text>Aihetta sivulla</Text>
      <Anchor ref={ref}>
        <Button onClick={() => setIsComponentVisible(true)}>
          10
          <Chevron
            variant={isComponentVisible ? 'up' : 'down'}
            color="white"
            isLarge
          />
        </Button>

        {isComponentVisible && (
          <Menu>
            <button>50</button>
            <button>70</button>
            <button>1000</button>
          </Menu>
        )}
      </Anchor>
    </Container>
  );
};

const Anchor = styled.div`
  overflow: hidden;
`;

const growDownAnimation = keyframes`
    0% {
        transform: scaleY(0)
    }
    80% {
        transform: scaleY(1.1)
    }
    100% {
        transform: scaleY(1)
    }
`;

const Menu = styled.div`
  animation: ${growDownAnimation} 400ms ease-in-out forwards;
  display: flex;
  flex-direction: column;
  position: absolute;
  transform-origin: top center;
  width: max-content;

  button:last-of-type {
    border-bottom: 2px solid ${palette.purple};
    border-radius: 0 0 16px 16px;
  }
`;

const Button = styled.button``;

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;