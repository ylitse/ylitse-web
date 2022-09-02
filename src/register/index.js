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

function clearError(field) {
  field.classList.remove('error-border');
  if (
    field.id === 'username' ||
    field.id === 'password' ||
    field.id === 'password-confirmation' ||
    field.id === 'email'
  ) {
    document
      .getElementById(`${field.id}-label`)
      .classList.remove('error-color');
    document.getElementById(`${field.id}-input-error`).style.display = 'none';
  }
}

function displayError(field) {
  var notEmpty = field.value.length > 0;
  if (notEmpty) {
    field.classList.add('error-border');
  }
  if (
    (field.id === 'username' && notEmpty) ||
    (field.id === 'password' && notEmpty) ||
    (field.id === 'password-confirmation' && notEmpty) ||
    field.id === 'email'
  ) {
    document.getElementById(`${field.id}-label`).classList.add('error-color');
    document.getElementById(`${field.id}-input-error`).style.display = 'flex';
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
        if (field.value.length > 0) {
          var username = document.getElementById(field.id).value;
          isUsernameFree(username).then(function (isUsernameFree) {
            if (isUsernameFree) {
              clearError(field);
              field.classList.add('input-checkmark');
            } else {
              formError = true;
              displayError(field);
              document.getElementById('submit').disabled = formError;
            }
          });
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
        displayError(field);
      }
    });
  // Submit button is disabled if there is a form error
  document.getElementById('submit').disabled = formError;
}
