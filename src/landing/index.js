(async function (_window, document) {
  const mentorsResponse = await fetch('/api/mentors').then(response =>
    response.json(),
  );
  const mentorsAmount = mentorsResponse.resources.length;
  const yearsOfService = new Date().getFullYear() - 2018;

  const getInfoLocalizations = (mentorAmount, yearsOfService) => ({
    en: {
      infoRing1: `${mentorAmount} mentoria`,
      infoRing2: `keskusteluja jo ${yearsOfService} vuotta`,
    },
    fi: {
      infoRing1: `${mentorAmount} mentoria`,
      infoRing2: `keskusteluja jo ${yearsOfService} vuotta`,
    },
  });

  const infoLocalizations = getInfoLocalizations(mentorsAmount, yearsOfService);

  for (const key of ['infoRing1', 'infoRing2']) {
    const element = document.querySelector(
      `[dynamic-localization-key="${key}"]`,
    );
    let translation = infoLocalizations['fi'][key];
    element.innerText = translation;
  }
})(window, document);
