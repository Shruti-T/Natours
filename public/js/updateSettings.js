/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

//type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    console.log('------herehhh------2----');
    console.log(res);
    console.log(res.data);
    if (res.data.status == 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    console.log('here----1----');
    showAlert('error', err.response.data.message);
  }
};
