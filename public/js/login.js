const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: email,
        password: password
      }
    });

    if (res.data.status == 'success') {
      alert('Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
    console.log(res);
  } catch (error) {
    alert(error.response.data.message);
  }
};

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
