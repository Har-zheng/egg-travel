const login = () => {
  fetch('/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": "zhz",
      "age": 123
    }),
  }).then(res => {
    location.reload()
  });
};
const logout = () => {
  fetch('/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    location.reload()
  });
};
