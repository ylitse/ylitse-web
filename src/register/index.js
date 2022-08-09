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

function checkForm() {
  var formError = false;
  document
    .getElementById('register-form')
    .querySelectorAll('input')
    .forEach(function (field) {
      if (field.checkValidity()) {
        field.classList.remove('error-border');
        if (field.value.length > 0) {
          field.classList.add('input-checkmark');
        }
        if (field.id === 'email') {
          document
            .getElementById('email-label')
            .classList.remove('error-color');
          document.getElementById('email-input-error').style.display = 'none';
        }
      } else {
        formError = true;
        field.classList.remove('input-checkmark');
        if (field.value.length > 0) {
          field.classList.add('error-border');
        }
        if (field.id === 'email') {
          document.getElementById('email-label').classList.add('error-color');
          document.getElementById('email-input-error').style.display = 'flex';
        }
      }
    });
  if (formError) {
    document.getElementById('submit').disabled = true;
  } else {
    document.getElementById('submit').disabled = false;
  }
}
