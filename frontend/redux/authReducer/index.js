// authReducer.js

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "../authActions";

// Get userData from localStorage if available
const savedUserData = JSON.parse(localStorage.getItem("userData"));

const initialState = {
  loading: false,
  registrationError: null,
  loginError: null,
  userData: savedUserData || null, // Set userData from localStorage or to null
  permission: savedUserData ? savedUserData.permission : "user", // Set permission from localStorage or to 'user'
  token: localStorage.getItem("jwtToken") || null, // Set token from localStorage or to null
  allUsers: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        registrationError: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload.data,
        permission: "user",
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        registrationError: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: {
          ...action.payload, // Kopirajte sva polja iz akcije (uključujući permission, jwt token, email, username)
        },
        loginError: null, // Reset loginError state on successful login
        token: action.payload.token,
      };
    case LOGIN_USER_FAILURE: // Handle login failure
      return {
        ...state,
        loading: false,
        loginError: action.payload, // Store the error message
      };
    case LOGOUT_USER:
      return {
        ...state,
        userData: null,
        permission: "user",
        token: null, // Clear the token on logout
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
