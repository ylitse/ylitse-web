import type { NavigationItem } from './NavigationItems';

import { useComponentVisible } from '@/hooks/useComponentShow';

import { palette } from '@/components/variables';
import styled, { css, keyframes } from 'styled-components';
import { InfoItem, Container } from './InfoItem';
import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';

export const infoItems: Array<NavigationItem> = [
  {
    text: 'Anna palautetta',
    url: 'https://www.sos-lapsikyla.fi',
  },
  {
    text: 'Käyttöehdot ja tietosuojaseloste',
    url: 'https://www.sos-lapsikyla.fi/tietosuojaselosteet',
  },
];

export const InfoDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);

  return (
    <Anchor ref={ref}>
      <Button
        isExpanded={isComponentVisible}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <Text
          variant={'link'}
          color={isComponentVisible ? 'darkblue' : 'white'}
        >
          Info
        </Text>
        {isComponentVisible ? (
          <ChevronUp size={8} color="purple" />
        ) : (
          <ChevronDown size={8} color="white" />
        )}
      </Button>

      {isComponentVisible && (
        <Menu>
          {infoItems.map(item => (
            <InfoItem key={item.text} {...item} />
          ))}
          <Container onClick={() => console.log('TODO: show modal')}>
            <Text variant="linkBold" color="purple">
              Tietoa palvelusta
            </Text>
          </Container>
        </Menu>
      )}
    </Anchor>
  );
};

export const Anchor = styled.div`
  position: relative;
`;

export const Button = styled.button<{ isExpanded?: boolean }>`
  position: relative;
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 0 1rem;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      background-color: ${palette.white};
    `}

  &:hover {
    background-color: ${palette.blue2};
  }
`;

export const growDownAnimation = keyframes`
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

export const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: max-content;
  top: 60px;
  left: -1px;
  animation: ${growDownAnimation} 400ms ease-in-out forwards;
  transform-origin: top center;

  div:first-of-type {
    border-top: 0.1rem solid ${palette.midgray};
  }

  button:last-of-type {
    border-radius: 0 0 16px 16px;
    border-bottom: 2px solid ${palette.purple};
  }
`;
