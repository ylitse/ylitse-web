/* eslint-disable */
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

(function (window, document) {
  var form = document.forms.namedItem('register');

  form.addEventListener(
    'submit',
    function (event) {
      var formData = new FormData(form);
      var createdUser;

      fetch('/api/accounts', {
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
      })
        .then(handleErrors)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          createdUser = data.user;

          return fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
              login_name: formData.get('username'),
              password: formData.get('password'),
            }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
        })
        .then(handleErrors)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          return fetch('/api/users/' + createdUser.id, {
            method: 'PUT',
            body: JSON.stringify({
              display_name: formData.get('display-name'),
              role: createdUser.role,
              account_id: createdUser.account_id,
              id: createdUser.id,
            }),
            credentials: 'include',
            headers: {
              Authorization: 'Bearer ' + data.tokens.access_token,
              'Content-Type': 'application/json',
            },
          });
        })
        .then(handleErrors)
        .then(function () {
          window.location.replace('/login');
        })
        .catch(function (error) {
          console.error(error.message);
        });
      event.preventDefault();
    },
    false,
  );
})(window, document);

function isUsernameFree(username) {
  return fetch('/api/search?login_name=' + username, { method: 'HEAD' }).then(
    function (response) {
      return response.status === 204;
    },
  );
}

function togglePasswordInput(inputId, toggleId) {
  var passwordInput = document.getElementById(inputId);
  var passwordToggle = document.getElementById(toggleId);
  if (passwordInput.getAttribute('type') === 'password') {
    passwordInput.type = 'text';
    passwordToggle.innerHTML = 'Piilota salasana';
  } else {
    passwordInput.type = 'password';
    passwordToggle.innerHTML = 'Näytä salasana';
  }
}

function togglePassword() {
  togglePasswordInput('password', 'password-toggle');
}

function togglePasswordConfirmation() {
  togglePasswordInput('password-confirmation', 'password-confirmation-toggle');
}

function getInputError(inputId) {
  return document
    .getElementById(inputId)
    .parentElement.querySelector('.input-error');
}

function clearError(field) {
  if (field.type !== 'checkbox') {
    field.classList.remove('error-border');
    document
      .querySelector(`label[for=${field.id}]`)
      .classList.remove('error-color');
    getInputError(field.id).style.display = 'none';
  }
}

function displayError(field) {
  if (field.value.length > 0) {
    field.classList.add('error-border');
    document
      .querySelector(`label[for=${field.id}]`)
      .classList.add('error-color');
    getInputError(field.id).style.display = 'flex';
  }
  field.classList.remove('input-checkmark');
}

function checkForm() {
  var formError = false;
  document
    .getElementById('register-form')
    .querySelectorAll('input')
    .forEach(function (field) {
      if (field.id === 'username') {
        // Username must be at least 2 characters long
        if (field.value.length >= 2) {
          var username = document.getElementById(field.id).value;
          isUsernameFree(username).then(function (isUsernameFree) {
            if (isUsernameFree) {
              clearError(field);
              field.classList.add('input-checkmark');
            } else {
              formError = true;
              getInputError('username').innerHTML =
                'Käyttäjätunnus on jo käytössä';
              displayError(field);
              document.getElementById('submit').disabled = formError;
            }
          });
        } else if (field.value.length === 1) {
          formError = true;
          getInputError('username').innerHTML = 'Käyttäjätunnus on liian lyhyt';
          displayError(field);
          document.getElementById('submit').disabled = formError;
        } else {
          clearError(field);
          field.classList.remove('input-checkmark');
        }
      } else if (field.id === 'password-confirmation') {
        var passwordsMatch =
          field.value === document.getElementById('password').value;
        if (passwordsMatch) {
          clearError(field);
          if (field.value.length >= 5) {
            field.classList.add('input-checkmark');
          }
        } else {
          formError = true;
          displayError(field);
        }
      } else if (field.checkValidity()) {
        clearError(field);
        if (field.value.length > 0) {
          field.classList.add('input-checkmark');
        }
      } else {
        formError = true;
        if (field.type !== 'checkbox') {
          displayError(field);
        }
      }
    });
  // Submit button is disabled if there is a form error
  document.getElementById('submit').disabled = formError;
}
