/* eslint-disable */
(function (window, document) {
  var form = document.forms.namedItem('register');

  form.addEventListener(
    'submit',
    function (event) {
      fetch('/api/webregister', {
        method: 'POST',
        body: new FormData(form),
        credentials: 'include',
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          var registrationError = document.getElementById('registration-error');
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

function togglePassword() {
  var passwordInput = document.getElementById('password');
  var passwordHint = document.getElementById('retrieve-password');
  if (passwordInput.getAttribute('type') === 'password') {
    passwordInput.type = 'text';
    passwordHint.innerHTML = 'Piilota salasana';
  } else {
    passwordInput.type = 'password';
    passwordHint.innerHTML = 'Näytä salasana';
  }
}

function checkForm() {
  var formError = false;
  document
    .getElementById('register-form')
    .querySelectorAll('input')
    .forEach(function (field) {
      if (field.checkValidity()) {
        field.classList.remove('input-error');
        if (field.value.length > 0) {
          field.classList.add('input-checkmark');
        }
        if (field.id === 'email') {
          document.getElementById('email-input-error').style.display = 'none';
        }
      } else {
        formError = true;
        field.classList.remove('input-checkmark');
        if (field.value.length > 0) {
          field.classList.add('input-error');
        }
        if (field.id === 'email') {
          document.getElementById('email-input-error').style.display = 'flex';
        }
      }
    });
  if (formError) {
    document.getElementById('submit-button').disabled = true;
  } else {
    document.getElementById('submit-button').disabled = false;
  }
}
