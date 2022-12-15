/* eslint-disable */
((window, document) => {
  const locale = 'fi';

  let translations = {};

  document.addEventListener('DOMContentLoaded', () => {
    setLocale(locale);
  });

  const fetchTranslations = async newLocale => {
    const response = await fetch(`/static/locales/${newLocale}/register.json`);

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
    if (newLocale === 'en') {
      disableLanguageButton(enButton);
      enableLanguageButton(fiButton);
    } else {
      disableLanguageButton(fiButton);
      enableLanguageButton(enButton);
    }
  };

  const enButton = document.getElementById('en-button');
  const fiButton = document.getElementById('fi-button');

  enButton.onclick = event => {
    event.preventDefault();
    setLocale('en');
  };

  fiButton.onclick = event => {
    event.preventDefault();
    setLocale('fi');
  };

  const toggleInput = id => {
    const input = document.getElementById(id);
    const toggle = document.getElementById(`${id}-toggle`);
    if (input.getAttribute('type') === 'password') {
      input.type = 'text';
      toggle.innerHTML = translations['hidePassword'];
    } else {
      input.type = 'password';
      toggle.innerHTML = translations['showPassword'];
    }
  };

  document.getElementById('password-toggle').onclick = () =>
    toggleInput('password');

  document.getElementById('password-confirmation-toggle').onclick = () =>
    toggleInput('password-confirmation');

  const form = document.forms.namedItem('register');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);

    try {
      // Create a new account
      const createAccountResponse = await fetch('/api/accounts', {
        method: 'POST',
        body: JSON.stringify({
          password: formData.get('password'),
          account: {
            role: 'mentee',
            login_name: formData.get('username'),
            email: formData.get('email'),
          },
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const accountData = await createAccountResponse.json();
      const createdUser = accountData.user;

      // Log in using the created account
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          login_name: formData.get('username'),
          password: formData.get('password'),
        }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const loginData = await loginResponse.json();

      // Update the user by adding the display name
      const updateUserResponse = await fetch(`/api/users/${createdUser.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          display_name: formData.get('display-name'),
          role: createdUser.role,
          account_id: createdUser.account_id,
          id: createdUser.id,
        }),
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${loginData.tokens.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      // Redirect to login page
      if (updateUserResponse.ok) {
        window.location.replace('/login');
      }
    } catch (error) {
      document.querySelector(`label[for=submit]`).style.display = 'flex';
    }
  });
})(window, document);

const isUsernameFree = async username => {
  const response = await fetch('/api/search?login_name=' + username, {
    method: 'HEAD',
  });
  if (response.status === 200) {
    // Response 200 OK: username exists
    return false;
  } else if (response.status === 204) {
    // Response 204 No Content: username doesn't exist
    return true;
  } else {
    throw Error;
  }
};

const getInputValue = id => document.getElementById(id).value;

const getErrorMessage = id =>
  document.getElementById(`${id}-field`).querySelector('.error-message');

const hideAllUsernameErrors = () =>
  getErrorMessage('username')
    .querySelectorAll('span')
    .forEach(message => (message.style.display = 'none'));

const changeUsernameError = id => {
  hideAllUsernameErrors();
  document.getElementById(id).style.display = 'flex';
};

const checkForError = async inputs => {
  for (const input of inputs) {
    if (!input.checkValidity()) return true; // Input value is invalid
    if (input.id === 'username') {
      try {
        const usernameIsFree = await isUsernameFree(input.value);
        if (!usernameIsFree) return true; // Username is taken
      } catch (error) {
        return true; // Username validation failed
      }
    }
    if (input.id === 'password-confirmation') {
      if (input.value !== getInputValue('password')) {
        return true; // Passwords don't match
      }
    }
  }
};

const checkForm = async () => {
  const inputs = document.querySelectorAll('input');
  const formError = await checkForError(inputs);
  // Disable submit button if an error is found
  document.getElementById('submit').disabled = formError;
};

const displayError = input => {
  document.getElementById('submit').disabled = true;
  input.classList.remove('input-checkmark');
  input.classList.add('error-border');
  document.querySelector(`label[for=${input.id}]`).classList.add('error-color');
  getErrorMessage(input.id).style.display = 'flex';
};

const removeError = input => {
  input.classList.remove('error-border');
  document
    .querySelector(`label[for=${input.id}]`)
    .classList.remove('error-color');
  getErrorMessage(input.id).style.display = 'none';
  checkForm();
};

const validatePasswordConfirmation = () => {
  const password = document.getElementById('password');
  const confirmation = document.getElementById('password-confirmation');
  password.value === confirmation.value
    ? removeError(confirmation) // Passwords match
    : displayError(confirmation); // Passwords don't match
  if (confirmation.value.length >= 8)
    confirmation.classList.add('input-checkmark');
};

const validateInput = input => {
  if (input.checkValidity()) {
    // Input value is valid
    removeError(input);
    if (input.id !== 'email' || input.value)
      // Empty email gets no checkmark
      input.classList.add('input-checkmark');
  } else {
    // Input value is invalid
    displayError(input);
  }
};

const checkInput = async id => {
  const input = document.getElementById(id);
  if (input.id === 'username') {
    if (!input.checkValidity()) {
      // Username is too short
      changeUsernameError('too-short-message');
      displayError(input);
    } else {
      // Username is long enough
      try {
        const usernameIsFree = await isUsernameFree(input.value);
        if (usernameIsFree) {
          hideAllUsernameErrors();
          removeError(input);
          input.classList.add('input-checkmark');
        } else {
          // Username is taken
          changeUsernameError('taken-message');
          displayError(input);
        }
      } catch (error) {
        // Username validation failed
        changeUsernameError('try-again-message');
        displayError(input);
      }
    }
  } else {
    if (input.id !== 'password-confirmation') validateInput(input);
    if (input.id === 'password' || input.id === 'password-confirmation')
      validatePasswordConfirmation();
  }
};
