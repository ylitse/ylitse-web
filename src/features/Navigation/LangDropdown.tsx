import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import styled from 'styled-components';
import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';
import { Anchor, Button, Menu } from './InfoDropdown';

export const LangDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (langCode: string): void => {
    i18n.changeLanguage(langCode);
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
          {i18n.language === 'en'
            ? t(`navigation.language.en.short`)
            : t(`navigation.language.fi.short`)}
        </Text>
        {isComponentVisible ? (
          <ChevronUp size={8} color="purple" />
        ) : (
          <ChevronDown size={8} color="white" />
        )}
      </Button>

      {isComponentVisible && (
        <Menu>
          <Item onClick={() => changeLanguage('en')}>
            <Text color="purple" variant="linkBold">
              {t(`navigation.language.en.long`)}
            </Text>
          </Item>
          <Item onClick={() => changeLanguage('fi')}>
            <Text color="purple" variant="linkBold">
              {t(`navigation.language.fi.long`)}
            </Text>
          </Item>
        </Menu>
      )}
    </Anchor>
  );
};

export const Item = styled.button`
  background: transparent;
  border: none;
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
