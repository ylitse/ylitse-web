/* eslint-disable */
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
    supportedLanguages.forEach(supportedLanguage => {
      if (language.includes(supportedLanguage)) return supportedLanguage;
    });
    return null;
  };

  const fetchTranslations = async newLocale => {
    const response = await fetch(`/static/locales/${newLocale}/${page}.json`);
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

  const enableLanguageButton = button =>
    styleButton(button, '#37119d', '700', 'auto');

  const disableLanguageButton = button =>
    styleButton(button, '#1c325d', '500', 'none');

  const setLocale = async newLocale => {
    translations = await fetchTranslations(newLocale);
    translatePage();

    document.documentElement.setAttribute('lang', newLocale);
    if (newLocale === 'en') {
      disableLanguageButton(enButton);
      enableLanguageButton(fiButton);
    } else {
      disableLanguageButton(fiButton);
      enableLanguageButton(enButton);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    setLocale(getBrowserLocale() ?? 'fi');
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
