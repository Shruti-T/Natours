// /* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';
// import { loadStripe } from '@stripe/stripe-js';

// export const bookTour = async tourId => {
//   try {
//     //1) get checkout session form server
//     const stripe = await loadStripe(
//       'pk_test_51MUV7KSCLivzx3p3wdACXs3z4POf4Ho87atPyF2RU5qpRar67D8VN1pw9PqrPQ0fea6qCSj0vo0PnDGEk0QwIVaZ00sQKMxA7t'
//     );

//     const session = await axios(
//       `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
//     );
//     console.log(session);
//     //2)create checkout form +charge credit card
//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };
