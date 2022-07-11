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
