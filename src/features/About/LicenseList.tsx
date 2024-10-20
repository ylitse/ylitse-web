import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import styled, { css } from 'styled-components';

import { useEffect, useState } from 'react';

type LicenseData = {
  name: string;
  licenses: string;
  repository?: string;
};

type LicensesJson = {
  [key: string]: {
    licenses: string;
    repository?: string;
  };
};

export const LicenseModal = () => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('common');
  const [licenseMap, setLicenseMap] = useState<LicenseData[]>([]);

  useEffect(() => {
    const loadLicenses = () => {
      try {
        //eslint-disable-next-line @typescript-eslint/no-var-requires
        const licenses: LicensesJson = require('../../../licenses.json');
        const licenseData = Object.entries(licenses).map<LicenseData>(
          ([libraryName, libraryData]) => ({
            name: libraryName,
            licenses: libraryData.licenses,
            repository: libraryData.repository,
          }),
        );
        setLicenseMap(licenseData);
      } catch (error) {
        setLicenseMap([]);
      }
    };

    loadLicenses();
  }, []);

  return (
    <Container isMobile={isMobile}>
      {licenseMap.length > 0 ? (
        licenseMap.map(license => (
          <LicenseRow key={license.name}>
            <LicenseInfo variant="p">
              {license.name} {license.licenses}
            </LicenseInfo>
            {license.repository && (
              <LicenseInfo variant="p">
                <a href={license.repository}>{license.repository}</a>
              </LicenseInfo>
            )}
          </LicenseRow>
        ))
      ) : (
        <LicenseInfo variant="p">{t('about.noFile')}</LicenseInfo>
      )}
    </Container>
  );
};

const LicenseRow = styled.div`
  align-items: left;
  display: flex;
  flex-direction: row;
  flexwrap: wrap;
  justify-content: space-between;
  margin: 0px;
`;

const LicenseInfo = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

const Container = styled.div<{ isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  left: 50%;
  margin: 1rem;
  opacity: 1;
  overflow: auto;
  padding: 1rem 1rem 2rem 1rem;
  scroll-snap-type: x mandatory;

  ${({ isMobile }) =>
    isMobile
      ? css`
          height: 10rem;
          width: 80vw;
        `
      : css`
          height: 10rem;
          width: 35vw;
        `}
`;

export default LicenseModal;
