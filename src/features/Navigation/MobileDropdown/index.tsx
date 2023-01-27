import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import type { LangCode } from '../LanguageDropdown';
import type { NavigationItem as NavItemType } from '../NavigationItems';

import { palette } from '@/components/variables';
import styled from 'styled-components';

import Text from '@/components/Text';
import { Chevron } from '@/components/Icons/Chevron';
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

  const { t, i18n } = useTranslation('common');

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
      <Row>
        <Text variant="linkHeader" color="white">
          {t('navigation.mobile.menu')}
        </Text>
        {isComponentVisible ? (
          <Chevron variant="up" color="white" isLarge />
        ) : (
          <Chevron variant="down" color="white" isLarge />
        )}
      </Row>

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
            <Text variant="link" color="purple">
              {t('navigation.info.link.feedback.text')}
            </Text>
          </UnstyledLink>
          <UnstyledLink
            href={t(`navigation.info.link.termsAndPrivacy.url`)}
            target="_blank"
            rel="noreferrer"
          >
            <Text variant="link" color="purple">
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
  align-items: center;
  all: unset;
  cursor: pointer;
  display: flex;
  gap: 4px;
  justify-content: center;
  padding: 0 3rem;
  text-align: center;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
  gap: 6px;
`;

const Menu = styled.div`
  animation: ${growDownAnimation} 400ms ease-in-out forwards;
  background-color: ${palette.white};
  box-shadow: 1px 0.5px ${palette.greyMid};
  display: flex;
  flex-direction: column;
  left: 0;
  margin-top: 2.5rem;
  position: absolute;
  right: 0;
  text-align: left;
  top: 40px;
  transform-origin: top center;
`;

const UnstyledLink = styled.a`
  height: 60px;
  padding: 0 2rem;
  text-decoration: none;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${palette.blue2};
  margin-bottom: 0.5rem;
`;

export default MobileDropdown;
