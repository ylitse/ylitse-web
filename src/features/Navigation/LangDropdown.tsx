import { useComponentVisible } from '@/hooks/useComponentShow';

import { palette } from '@/components/variables';
import styled from 'styled-components';
import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';
import { Anchor, Button, Menu } from './InfoDropdown';

export const languages = [
  { code: 'fi', label: 'FI - Suomeksi' },
  { code: 'en', label: 'EN - In English' },
];

export const LangDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);

  const handleLangChange = () => {
    console.log('change the language');
    setIsComponentVisible(false);
  };

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
          FI
        </Text>
        {isComponentVisible ? (
          <ChevronUp size={8} color="purple" />
        ) : (
          <ChevronDown size={8} color="white" />
        )}
      </Button>

      {isComponentVisible && (
        <Menu>
          {languages.map(lang => (
            <Item key={lang.code} onClick={handleLangChange}>
              <Text color="purple" variant="linkBold">
                {lang.label}
              </Text>
            </Item>
          ))}
        </Menu>
      )}
    </Anchor>
  );
};

export const Item = styled.div`
  gap: 0.5rem;
  display: flex;
  background-color: ${palette.white};
  height: 58px;
  padding: 0 1rem;
  cursor: pointer;
  border-left: 2px solid ${palette.purple};
  border-right: 2px solid ${palette.purple};

  &:hover {
    background-color: ${palette.lightblue};
  }
`;
