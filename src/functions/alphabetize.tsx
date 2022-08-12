type Props = {
  data: Array<string>;
  locale: string;
};

export const alphabetize = ({ data, locale = 'fi' }: Props) => {
  //change the first letter of every word to uppercase, then alphabetize
  const upperCaseSkills: Array<string> = [];
  data.forEach(item => {
    upperCaseSkills.push(
      `${item.charAt(0).trim().toUpperCase()}${item.slice(1)}`,
    );
  });
  const sortedSkills = [...upperCaseSkills].sort((a, b) =>
    a.localeCompare(b, locale),
  );
  return sortedSkills;
};
