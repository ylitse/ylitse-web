import { useComponentVisible } from '@/hooks/useComponentShow';

import type { NavigationItem } from './NavigationItems';

import { palette } from '@/components/variables';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Text from '@/components/Text';
import { ChevronUp } from '@/components/Icons/ChevronUp';
import { ChevronDown } from '@/components/Icons/ChevronDown';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { languages } from './LangDropdown';
import { growDownAnimation } from './InfoDropdown';

type Props = {
  items: Array<NavigationItem>;
};
export const MobileDropdown: React.FC<Props> = ({ items }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLButtonElement>(true);
  const { t } = useTranslation();

  const infoItems: Array<NavigationItem> = [
    {
      text: t('navigation.info.feedback'),
      url: 'https://www.sos-lapsikyla.fi',
    },
    {
      text: t('navigation.info.termsAndPrivacy'),
      url: 'https://www.sos-lapsikyla.fi/tietosuojaselosteet',
    },
  ];

  const handleLangChange = () => {
    console.log('change language');
    setIsComponentVisible(false);
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

          {infoItems.map(item => (
            <UnstyledLink
              key={t(`navigation.info.link.${item}.text`)}
              href={t(`navigation.info.link.${item}.url`)}
              target="_blank"
              rel="noreferrer"
            >
              <Text variant="linkMobile" color="purple">
                {t(`navigation.info.link.${item}.text`)}
              </Text>
            </UnstyledLink>
          ))}

          <Divider />

          {languages.map(lang => (
            <UnstyledDiv key={lang.code} onClick={handleLangChange}>
              <Text variant="linkMobile" color="purple">
                {lang.label}
              </Text>
            </UnstyledDiv>
          ))}

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

const UnstyledDiv = styled.a`
  padding: 0 2rem;
  cursor: pointer;
`;

const UnstyledRouteLink = styled(RouterNavLink)`
  padding: 0 2rem;
  text-decoration: none;
`;

const Divider = styled.div`
  border-bottom: 2px solid ${palette.blue2};
`;
