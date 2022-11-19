import React from 'react';

// Hook used for checking the pill-shaking animation when the pill is selected
// We dont want to shake the pills on the first render, for example when we are coming back from another page. Only when we actually do the selection

export const usePillShakeChecker = (initialSkills: Array<string>) => {
  const [existingSelected, setExistingSelected] = React.useState<
    Record<string, boolean>
  >({});

  // We only use existingSelected for checking the first render. But we want to remove the skill from the map if we de-select the skill. Then re-selecting it will trigger the animation again
  const syncExisting = (skill: string) => {
    if (existingSelected[skill]) {
      setExistingSelected({ ...existingSelected, [skill]: false });
    }
  };

  React.useEffect(() => {
    const existingSelected = initialSkills.reduce(
      (selected, skill) => ({ ...selected, [skill]: true }),
      {},
    );
    setExistingSelected(existingSelected);
  }, []);

  return { existingSelected, syncExisting };
};
