import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import type { LangCode } from '../LanguageDropdown';
import type { NavigationItem as NavItemType } from '../NavigationItems';

import { palette } from '@/components/variables';
import styled from 'styled-components';

import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';
import { useLocation } from 'react-router-dom';
import { growDownAnimation } from '../InfoDropdown';
import { LanguageItem } from './MobileLangItem';
import { NavigationItem } from './MobileNavItem';

type Props = {
  items: Array<NavItemType>;
};

const MobileDropdown: React.FC<Props> = ({ items }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLButtonElement>(true);

  const { t, i18n } = useTranslation();

  const { pathname } = useLocation();

  const isSelected = (langCode: LangCode): boolean =>
    i18n.language === langCode;

  const changeLanguage = (langCode: LangCode): void => {
    i18n.changeLanguage(langCode);
  };

  return (
    <Dropdown
      ref={ref}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
    >
      <Text variant={'linkMobile'} color={'white'}>
        {t('navigation.mobile.menu')}
      </Text>
      {isComponentVisible ? (
        <ChevronUp size={8} color="white" />
      ) : (
        <ChevronDown size={8} color="white" />
      )}

      {isComponentVisible && (
        <Menu>
          {items.map(item => (
            <NavigationItem
              key={item.url}
              text={item.text}
              url={item.url}
              currentLocation={pathname}
            />
          ))}

          <Divider />

          <UnstyledLink
            href={t(`navigation.info.link.feedback.url`)}
            target="_blank"
            rel="noreferrer"
          >
            <Text variant="linkMobile" color="purple">
              {t('navigation.info.link.feedback.text')}
            </Text>
          </UnstyledLink>
          <UnstyledLink
            href={t(`navigation.info.link.termsAndPrivacy.url`)}
            target="_blank"
            rel="noreferrer"
          >
            <Text variant="linkMobile" color="purple">
              {t('navigation.info.link.termsAndPrivacy.text')}
            </Text>
          </UnstyledLink>

          <Divider />

          <LanguageItem
            changeLang={() => changeLanguage('en')}
            isSelected={isSelected('en')}
            text={t(`navigation.language.en.long`)}
          />
          <LanguageItem
            changeLang={() => changeLanguage('fi')}
            isSelected={isSelected('fi')}
            text={t(`navigation.language.fi.long`)}
          />
          <Divider />

          <NavigationItem
            text={t('navigation.logout')}
            url={'/logout'}
            currentLocation={pathname}
          />
        </Menu>
      )}
    </Dropdown>
  );
};

const Dropdown = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 0 3rem;
`;

const Menu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  text-align: left;
  margin-top: 2.5rem;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0.5px ${palette.midgray};

  animation: ${growDownAnimation} 400ms ease-in-out forwards;
  transform-origin: top center;
`;

const UnstyledLink = styled.a`
  padding: 0 2rem;
  line-height: 56px;
  text-decoration: none;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${palette.blue2};
  margin-bottom: 0.5rem;
`;

export default MobileDropdown;
