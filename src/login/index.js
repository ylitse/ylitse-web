/* eslint-disable */
(function (window, document) {
  var form = document.forms.namedItem('login');

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
          var loginError = document.getElementById('login-error');
          loginError.style.display = 'flex';
          form.reset();
          form.elements[0].focus();
          throw new TypeError("Couldn't log in.");
        })
        .then(function (data) {
          sessionStorage.setItem('user', 'token');
          window.location.href = '/';
        })
        .catch(function (error) {
          console.log(error.message);
        });

      event.preventDefault();
    },
    false,
  );
})(window, document);
