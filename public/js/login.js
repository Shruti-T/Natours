import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
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
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
    console.log(res);
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
