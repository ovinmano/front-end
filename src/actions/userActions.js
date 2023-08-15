// import axios from 'axios';

// // Action Types
// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// // Action Creators
// export const registerSuccess = () => {
//   return {
//     type: REGISTER_SUCCESS,
//   };
// };

// export const registerFailure = (error) => {
//   return {
//     type: REGISTER_FAILURE,
//     payload: error,
//   };
// };

// // Thunk function for user registration
// export const registerUser = (user) => {
//   return async (dispatch) => {
//     try {
//       const result = await axios.post('http://localhost:5000/register', user);
//       dispatch(registerSuccess());
//       console.log(result.data);
//     } catch (error) {
//       dispatch(registerFailure(error));
//       console.log(error);
//     }
//   };
// };
