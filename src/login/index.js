/* eslint-disable */
(function (window, document) {
  const locale = 'fi';

  let translations = {};

  document.addEventListener('DOMContentLoaded', () => {
    setLocale(locale);
  });

  const fetchTranslations = async newLocale => {
    const response = await fetch(`/static/locales/${newLocale}/login.json`);

    if (!response.ok) {
      console.log(`Could not fetch translations for locale ${newLocale}`);
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

  const setLocale = async newLocale => {
    translations = await fetchTranslations(newLocale);

    translatePage();
  };

  const form = document.forms.namedItem('login');

  form.addEventListener(
    'submit',
    function (event) {
      fetch('/api/weblogin', {
        method: 'POST',
        body: new FormData(form),
        credentials: 'include',
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          const loginError = document.getElementById('login-error');
          loginError.style.display = 'flex';
          form.reset();
          form.elements[0].focus();
          throw new TypeError("Couldn't log in.");
        })
        .then(function (data) {
          window.location.href = '/';
        })
        .catch(function (error) {
          console.log(error.message);
        });

      event.preventDefault();
    },
    false,
  );
})(window, document);
