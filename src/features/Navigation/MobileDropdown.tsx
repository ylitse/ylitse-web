import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import type { LangCode } from './LangDropdown';
import type { NavigationItem } from './NavigationItems';

import { palette } from '@/components/variables';
import styled from 'styled-components';

import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { growDownAnimation } from './InfoDropdown';
import { MobileLangItem } from './MobileLangItem';

type Props = {
  items: Array<NavigationItem>;
};
export const MobileDropdown: React.FC<Props> = ({ items }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLButtonElement>(true);
  const { t, i18n } = useTranslation();

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
            <UnstyledRouteLink key={item.text} to={item.url}>
              <Text variant="linkMobile" color="purple">
                {item.text}
              </Text>
            </UnstyledRouteLink>
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
          <MobileLangItem
            changeLang={() => changeLanguage('en')}
            isSelected={isSelected('en')}
            text={t(`navigation.language.en.long`)}
          />
          <MobileLangItem
            changeLang={() => changeLanguage('fi')}
            isSelected={isSelected('fi')}
            text={t(`navigation.language.fi.long`)}
          />
          <Divider />
          <UnstyledRouteLink to="/logout">
            <Text variant="linkMobile" color="purple">
              {t('navigation.logout')}
            </Text>
          </UnstyledRouteLink>
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
  padding: 0 1rem;
`;

const Menu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  margin-top: 2rem;
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0.5px ${palette.midgray};

  animation: ${growDownAnimation} 400ms ease-in-out forwards;
  transform-origin: top center;
`;

const UnstyledLink = styled.a`
  padding: 0 2rem;
  text-decoration: none;
`;

const UnstyledRouteLink = styled(RouterNavLink)`
  padding: 0 2rem;
  text-decoration: none;
`;

const Divider = styled.div`
  border-bottom: 2px solid ${palette.blue2};
`;
