import { useComponentVisible } from '@/hooks/useComponentShow';

import { pageSizes } from './const';

import { animations, palette } from '@/components/variables';
import styled from 'styled-components';
import Text from '@/components/Text';
import { OpenButton } from './OpenButton';
import { PageOption } from './PageOption';

type Props = {
  skillsInPage: number;
  setSkillsInPage: (nextSize: number) => void;
};
const PageSizeDropdown = ({ skillsInPage, setSkillsInPage }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);

  return (
    <Container>
      <Text>Aihetta sivulla</Text>
      <Anchor ref={ref}>
        <OpenButton
          isComponentVisible={isComponentVisible}
          onClick={setIsComponentVisible}
          selected={skillsInPage}
        />

        {isComponentVisible && (
          <Menu>
            {pageSizes.map(size => (
              <PageOption
                key={size}
                onClick={setSkillsInPage}
                isSelected={size === skillsInPage}
                size={size}
              />
            ))}
          </Menu>
        )}
      </Anchor>
    </Container>
  );
};

const Anchor = styled.div`
  overflow: hidden;
`;

const Menu = styled.div`
  animation: ${animations.growDown};
  display: flex;
  flex-direction: column;
  position: absolute;
  transform-origin: top center;
  width: 62px;
  z-index: 10;

  button:last-of-type {
    border-bottom: 2px solid ${palette.purple};
    border-radius: 0 0 8px 8px;
  }
`;

const Container = styled.div`
  align-items: baseline;
  display: flex;
  gap: 1rem;
`;

export default PageSizeDropdown;
