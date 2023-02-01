import React from 'react';

// Hook used for checking the pill-shaking animation when the pill is selected
// We dont want to shake the pills on the first render, for example when we are coming back from another page.
// Only when we actually do the selection

export const usePillShakeChecker = (initialSkills: Array<string>) => {
  const [existingSelected, setExistingSelected] = React.useState<
    Record<string, boolean>
  >({});

  // Small timeout to sync the skill so the animation gets run before
  const syncExisting = (skill: string) => {
    setTimeout(() => {
      setExistingSelected({
        ...existingSelected,
        [skill]: !existingSelected[skill],
      });
    }, 500);
  };

  React.useLayoutEffect(() => {
    const existingSelected = initialSkills.reduce(
      (selected, skill) => ({ ...selected, [skill]: true }),
      {},
    );
    setExistingSelected(existingSelected);
  }, []);

  return { existingSelected, syncExisting };
};
