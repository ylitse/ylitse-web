import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { fetchNotices } from '../noticesApi';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

import type { Notice } from '../noticesApi';

const Notices = () => {
  const { t } = useTranslation('home');
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const notices: Notice[] = fetchNotices();
    setNotices(notices);
  }, [notices]);

  return (
    <Container>
      <Text variant="h2">{t('notices.title')}</Text>
      {notices.map(notice => (
        <Notice key={notice.id}>{notice.message}</Notice>
      ))}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 2rem;
`;

const Notice = styled(Text)`
  background-color: ${palette.blueWhite};
  border-left: 10px white solid;
  box-shadow: -10px 0 0 0 ${palette.blue};
  left: 10px;
  margin-top: 1rem;
  padding: 1rem;
  position: relative;
`;

export default Notices;
