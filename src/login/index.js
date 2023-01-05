/* eslint-disable */
(function (window, document) {
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
          document.getElementById('submit-error-snackbar').className = 'show';
        });

      event.preventDefault();
    },
    false,
  );
})(window, document);

const closeSnackbar = () => {
  document
    .getElementById('submit-error-snackbar')
    .className.replace('show', '');
};
