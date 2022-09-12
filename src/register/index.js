/* eslint-disable */
((window, document) => {
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
      document.getElementById('submit-error').style.display = 'flex';
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

const toggleInput = id => {
  const input = document.getElementById(id);
  const toggle = document.getElementById(`${id}-toggle`);
  if (input.getAttribute('type') === 'password') {
    input.type = 'text';
    toggle.innerHTML = 'Piilota salasana';
  } else {
    input.type = 'password';
    toggle.innerHTML = 'Näytä salasana';
  }
};

const getInputError = id =>
  document.getElementById(id).parentElement.querySelector('.input-error');

const displayError = input => {
  input.classList.remove('input-checkmark');
  input.classList.add('error-border');
  document.querySelector(`label[for=${input.id}]`).classList.add('error-color');
  getInputError(input.id).style.display = 'flex';
};

const displayErrorWithMessage = (input, message) => {
  getInputError(input.id).querySelector('span').innerHTML = message;
  displayError(input);
};

const removeError = input => {
  input.classList.remove('error-border');
  document
    .querySelector(`label[for=${input.id}]`)
    .classList.remove('error-color');
  getInputError(input.id).style.display = 'none';
};

const checkForm = async () => {
  let formError = false;
  const inputs = document
    .getElementById('register-form')
    .querySelectorAll('input');

  // Validate all inputs
  for (const input of inputs) {
    if (input.id === 'username') {
      if (input.checkValidity()) {
        // Username is long enough
        const username = document.getElementById(input.id).value;
        try {
          const usernameIsFree = await isUsernameFree(username);
          if (usernameIsFree) {
            removeError(input);
            input.classList.add('input-checkmark');
          } else {
            // Username is taken
            formError = true;
            displayErrorWithMessage(input, 'Käyttäjätunnus on jo käytössä.');
          }
        } catch (error) {
          // Username validation failed
          formError = true;
          displayErrorWithMessage(
            input,
            'Emme pystyneet tarkistamaan käyttäjätunnusta. Syötä tunnus uudelleen hetken kuluttua.',
          );
        }
      } else {
        // Username is too short
        formError = true;
        displayErrorWithMessage(input, 'Käyttäjätunnus on liian lyhyt');
      }
    } else if (input.id === 'password-confirmation') {
      if (input.value === document.getElementById('password').value) {
        // Passwords match
        removeError(input);
        if (input.value.length >= 8) {
          input.classList.add('input-checkmark');
        }
      } else {
        // Passwords don't match
        formError = true;
        displayError(input);
      }
    } else if (input.checkValidity()) {
      // Input value is valid
      if (input.type !== 'checkbox') {
        removeError(input);
        if (input.id !== 'email' || input.value)
          // Empty email gets no checkmark
          input.classList.add('input-checkmark');
      }
    } else {
      // Input value is invalid
      formError = true;
      if (input.type !== 'checkbox') {
        displayError(input);
      }
    }
  }
  // Disable submit button if any input is invalid
  document.getElementById('submit').disabled = formError;
};
