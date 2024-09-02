(function (window, document) {
  const form = document.forms.namedItem('login');

  form.addEventListener(
    'submit',
    function (event) {
      document.getElementById('mfa-token').setAttribute('name', 'mfa_token');

      event.preventDefault();

      const toLoginPayload = data => {
        const formData = new FormData(data);
        const json = Object.fromEntries(formData);
        const removedEmpty = Object.keys(json).reduce((acc, curr) => {
          if (json[curr].length > 0) {
            return { ...acc, [curr]: json[curr] };
          }
          return acc;
        }, {});
        return JSON.stringify(removedEmpty);
      };

      fetch('/api/login', {
        body: toLoginPayload(form),
        headers: { 'Content-Type': 'application/json' },
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
        .then(responseJson => {
          sessionStorage.setItem(
            'access_token',
            responseJson.tokens.access_token,
          );
          sessionStorage.setItem(
            'refresh_token',
            responseJson.tokens.refresh_token,
          );
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
