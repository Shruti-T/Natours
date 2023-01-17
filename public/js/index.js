import '@babel/polyfill';
import { displayMap } from './mapbox.js';
import { login, logout } from './login';

// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('form--login');
const logOutBtn = document.querySelector('.nav__el--logout');

//DELEGATIONS
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
