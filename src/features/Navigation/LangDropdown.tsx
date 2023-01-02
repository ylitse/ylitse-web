import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import Text from '@/components/Text';
import { LangItem } from './LangItem';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';
import { Anchor, Button, Menu } from './InfoDropdown';

export type LangCode = 'en' | 'fi';

export const LangDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);
  const { t, i18n } = useTranslation();

  const isSelected = (langCode: LangCode): boolean =>
    i18n.language === langCode;

  const changeLanguage = (langCode: LangCode): void => {
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
          <LangItem
            changeLang={() => changeLanguage('en')}
            isSelected={isSelected('en')}
            text={t(`navigation.language.en.long`)}
          />
          <LangItem
            changeLang={() => changeLanguage('fi')}
            isSelected={isSelected('fi')}
            text={t(`navigation.language.fi.long`)}
          />
        </Menu>
      )}
    </Anchor>
  );
};
