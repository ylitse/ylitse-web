(function (document) {
  const page = window.location.toString().includes('login')
    ? 'login'
    : 'register';

  const supportedLanguages = ['en', 'fi'];
  let translations = {};

  const enButton = document.getElementById('en-button');
  const fiButton = document.getElementById('fi-button');

  const getBrowserLocale = () => {
    const language = navigator.language;
    if (!language) return null;

    let languageMatch = null;
    for (const supportedLanguage of supportedLanguages) {
      if (language.includes(supportedLanguage))
        languageMatch = supportedLanguage;
    }
    return languageMatch;
  };

  const fetchTranslations = async newLocale => {
    const response = await fetch(`../static/locales/${newLocale}/${page}.json`);
    if (!response.ok) {
      console.error(`Could not fetch translations for locale ${newLocale}`);
    }
    return await response.json();
  };

  const translatePage = () => {
    document.querySelectorAll('[localization-key]').forEach(element => {
      let key = element.getAttribute('localization-key');
      let translation = translations[key];
      element.innerText = translation;
    });
  };

  const styleButton = (button, color, fontWeight, pointerEvents) => {
    button.style.color = color;
    button.style.fontWeight = fontWeight;
    button.style.pointerEvents = pointerEvents;
  };

  const showClass = className =>
    document
      .querySelectorAll(`.${className}`)
      .forEach(element => (element.style.display = 'unset'));

  const hideClass = className =>
    document
      .querySelectorAll(`.${className}`)
      .forEach(element => (element.style.display = 'none'));

  const enableLanguageButton = button =>
    styleButton(button, '#37119d', '700', 'auto');

  const disableLanguageButton = button =>
    styleButton(button, '#1c325d', '500', 'none');

  const setLocale = async newLocale => {
    translations = await fetchTranslations(newLocale);
    translatePage();

    // Set document language.
    document.documentElement.setAttribute('lang', newLocale);

    // Set alt texts and language buttons.
    if (newLocale === 'en') {
      showClass('en-alt-text');
      hideClass('fi-alt-text');
      disableLanguageButton(enButton);
      enableLanguageButton(fiButton);
    } else {
      showClass('fi-alt-text');
      hideClass('en-alt-text');
      disableLanguageButton(fiButton);
      enableLanguageButton(enButton);
    }
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const browserLocale = getBrowserLocale();
    setLocale(browserLocale ?? 'fi');
  });

  enButton.onclick = event => {
    event.preventDefault();
    setLocale('en');
  };

  fiButton.onclick = event => {
    event.preventDefault();
    setLocale('fi');
  };
})(document);
