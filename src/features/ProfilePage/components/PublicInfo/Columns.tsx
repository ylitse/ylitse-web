import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Column } from '@/components/common';
import LabeledInput from '@/components/LabeledInput';
import Slider from '@/components/Slider';
import Text from '@/components/Text';

import type { ApiMentor } from '@/features/MentorPage/mentorPageApi';

type Props = {
  isBirthYearInvalid: boolean;
  isDisplayNameTooShort: boolean;
  isMobile: boolean;
  mentor: ApiMentor;
  updateMentor: <K extends keyof ApiMentor>(
    key: K,
    value: ApiMentor[K],
  ) => void;
};

const Columns = ({
  isBirthYearInvalid,
  isDisplayNameTooShort,
  isMobile,
  mentor,
  updateMentor,
}: Props) => {
  const { t } = useTranslation('profile');

  return (
    <Container isMobile={isMobile}>
      <Column>
        <LabeledInput
          error={
            isDisplayNameTooShort
              ? t('public.mentor.displayName.tooShortError')
              : null
          }
          label={t('public.mentor.displayName.label')}
          onChange={value => updateMentor('display_name', value)}
          value={mentor.display_name}
        />
        <LabeledInput
          error={
            isBirthYearInvalid
              ? t('public.mentor.birthYear.invalidError')
              : null
          }
          label={t('public.mentor.birthYear.label')}
          onChange={value => updateMentor('birth_year', Number(value))}
          value={String(mentor.birth_year)}
          type="number"
        />
        <LabeledInput
          label={t('public.mentor.region')}
          onChange={value => updateMentor('region', value)}
          value={mentor.region}
        />
      </Column>
      <Column>
        <LabeledInput
          label={t('public.mentor.statusMessage')}
          onChange={value => updateMentor('status_message', value)}
          value={mentor.status_message}
        />
        <Slider
          id="is-vacationing-slider"
          label={t('public.mentor.vacation.title')}
          onChange={() =>
            updateMentor('is_vacationing', !mentor.is_vacationing)
          }
          text={t(
            `public.mentor.vacation.switch.${
              mentor.is_vacationing ? 'on' : 'off'
            }`,
          )}
          value={mentor.is_vacationing}
        />
        <Text variant="blueBox">{t('public.mentor.vacation.info')}</Text>
      </Column>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  ${({ isMobile }) =>
    isMobile
      ? css`
          flex-direction: column;
        `
      : css`
          gap: 3rem;
        `}
`;

export default Columns;
