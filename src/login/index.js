(function (window, document) {
  const form = document.forms.namedItem('login');

  form.addEventListener(
    'submit',
    function (event) {
      document.getElementById('mfa-token').setAttribute('name', 'mfa_token');

      fetch('/api/weblogin', {
        body: new FormData(form),
        credentials: 'include',
        method: 'POST',
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
        .then(function () {
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
