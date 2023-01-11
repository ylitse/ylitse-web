import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import styled, { keyframes } from 'styled-components';
import { InfoItem, Container } from './InfoItem';
import { DropdownButton } from './DropdownButton';
import Text from '@/components/Text';

const InfoDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);
  const { t } = useTranslation();

  return (
    <Anchor ref={ref}>
      <DropdownButton
        isComponentVisible={isComponentVisible}
        setIsComponentVisible={setIsComponentVisible}
        text={t('navigation.info.title')}
      />

      {isComponentVisible && (
        <Menu>
          <InfoItem
            {...{
              text: t('navigation.info.link.feedback.text'),
              url: t('navigation.info.link.feedback.url'),
            }}
          />
          <InfoItem
            {...{
              text: t('navigation.info.link.termsAndPrivacy.text'),
              url: t('navigation.info.link.termsAndPrivacy.url'),
            }}
          />
          <Container onClick={() => console.log('TODO: show modal')}>
            <Text variant="linkBold" color="purple">
              {t('navigation.info.applicationInfo')}
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
  left: -2px;
  animation: ${growDownAnimation} 400ms ease-in-out forwards;
  transform-origin: top center;

  button:last-of-type {
    border-radius: 0 0 16px 16px;
    border-bottom: 2px solid ${palette.purple};
  }
`;

export default InfoDropdown;
