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
  let requiredFieldsFilled = true;
  document
    .getElementById('register-form')
    .querySelectorAll('[required]')
    .forEach(function (field) {
      if (!requiredFieldsFilled) return;
      if (!field.checkValidity()) {
        console.log(field);
        requiredFieldsFilled = false;
        return;
      }
    });
  if (requiredFieldsFilled) {
    document.getElementById('submit-button').disabled = false;
  } else {
    document.getElementById('submit-button').disabled = true;
  }
}
