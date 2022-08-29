/* eslint-disable */
(function (window, document) {
  var form = document.forms.namedItem('register');

  form.addEventListener(
    'submit',
    function (event) {
      fetch('/api/register', {
        method: 'POST',
        body: new FormData(form),
        credentials: 'include',
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function (data) {
          window.location.href = '/login';
        })
        .catch(function (error) {
          console.log(error.message);
        });
      event.preventDefault();
    },
    false,
  );
})(window, document);

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
      if (field.id === 'password-confirmation') {
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
