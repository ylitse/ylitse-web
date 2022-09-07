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
      console.error(error);
    }
  });
})(window, document);

const isUsernameFree = async username => {
  const response = await fetch('/api/search?login_name=' + username, {
    method: 'HEAD',
  });
  return response.status === 204;
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
  input.classList.add('error-border');
  document.querySelector(`label[for=${input.id}]`).classList.add('error-color');
  getInputError(input.id).style.display = 'flex';
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
    if (!input.value && input.type !== 'checkbox') {
      // Text input is empty
      if (input.id !== 'email') {
        // A missing email is not an error
        formError = true;
      }
      removeError(input);
      input.classList.remove('input-checkmark');
    } else if (input.id === 'username') {
      if (input.checkValidity()) {
        // Username is long enough
        const username = document.getElementById(input.id).value;
        const usernameIsFree = await isUsernameFree(username);
        if (usernameIsFree) {
          removeError(input);
          input.classList.add('input-checkmark');
        } else {
          // Username is taken
          formError = true;
          input.classList.remove('input-checkmark');
          getInputError('username').innerHTML = 'Käyttäjätunnus on jo käytössä';
          displayError(input);
        }
      } else {
        // Username is too short
        formError = true;
        input.classList.remove('input-checkmark');
        getInputError('username').innerHTML = 'Käyttäjätunnus on liian lyhyt';
        displayError(input);
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
        input.classList.remove('input-checkmark');
      }
    } else if (input.checkValidity()) {
      // Input value is valid
      if (input.type !== 'checkbox') {
        removeError(input);
        input.classList.add('input-checkmark');
      }
    } else {
      // Input value is invalid
      formError = true;
      if (input.type !== 'checkbox') {
        displayError(input);
        input.classList.remove('input-checkmark');
      }
    }
  }
  // Disable submit button if any input is invalid
  document.getElementById('submit').disabled = formError;
};
