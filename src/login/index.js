(function (window, document) {
  const form = document.forms.namedItem('login');

  form.addEventListener(
    'submit',
    function (event) {
      event.preventDefault();

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
        .then(function () {
          window.location.href = '/';
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
    false,
  );
})(window, document);
