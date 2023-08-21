import axios from "axios";

// Action types
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

// fetch all users
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// update users
export const UPDATE_USERS_REQUEST = "UPDATE_USERS_REQUEST";
export const UPDATE_USERS_SUCCESS = "UPDATE_USERS_SUCCESS";
export const UPDATE_USERS_FAILURE = "UPDATE_USERS_FAILURE";

// delete users
export const DELETE_USERS_REQUEST = "DELETE_USERS_REQUEST";
export const DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS";
export const DELETE_USERS_FAILURE = "DELETE_USERS_FAILURE";

// Action creators
export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (userData) => ({
  type: REGISTER_USER_SUCCESS,
  payload: userData,
});

export const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (userData) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const fetchUsersSuccess = (allUsers) => ({
  type: FETCH_USER_SUCCESS,
  payload: allUsers,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

// Action creators for updating form data
export const updateUsersRequest = () => ({
  type: UPDATE_USERS_REQUEST,
});
export const updateUsersSuccess = (updateUsers) => ({
  type: UPDATE_USERS_SUCCESS,
  payload: updateUsers,
});
export const updateUsersFailure = (error) => ({
  type: UPDATE_USERS_FAILURE,
  payload: error,
});
export const deleteUsersRequest = () => ({
  type: DELETE_USERS_REQUEST,
});

export const deleteUsersSuccess = () => ({
  type: DELETE_USERS_SUCCESS,
});

export const deleteUsersFailure = (error) => ({
  type: DELETE_USERS_FAILURE,
  payload: error,
});

export const registerUserAsync = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());

    const token = localStorage.getItem("jwtToken");

    const response = await axios.post('http://localhost:8081/register', userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    dispatch(registerUserFailure(error.message));
  }
};

export const loginUserAsync = (userData) => async (dispatch) => {
  try {
    dispatch(loginUserRequest());

    const response = await axios.post('http://localhost:8081/login', userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = response;
    const { token, ...userDataWithPermission } = data;

    localStorage.setItem("userData", JSON.stringify(userDataWithPermission));
    localStorage.setItem("jwtToken", token);

    dispatch(loginUserSuccess(userDataWithPermission));
  } catch (error) {
    dispatch(loginUserFailure(error.message));
  }
};

export const checkLoggedInUser = () => (dispatch) => {
  return new Promise((resolve) => {
    const userData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("jwtToken");

    if (userData && storedToken) {
      dispatch(loginUserSuccess(JSON.parse(userData)));
      resolve(true);
    } else {
      dispatch(logoutUser());
      resolve(false);
    }
  });
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken"); // Fetch the JWT token from local storage

    const response = await axios.get('http://localhost:8081/allUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

// update
export const updateAllUsersAsync = (id, updateUsers) => async (dispatch) => {
  try {
    dispatch(updateUsersRequest());

    const token = localStorage.getItem("jwtToken");

    const response = await axios.put(
      `http://localhost:8081/updateUsers/${id}`,
      updateUsers,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(updateUsersSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(updateUsersFailure(error.message));
    throw error;
  }
};

// delete
export const deleteUsersAsync = (id) => async (dispatch) => {
  try {
    dispatch(deleteUsersRequest());

    const token = localStorage.getItem("jwtToken");
    await axios.delete(`http://localhost:8081/deleteUsers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteUsersSuccess());
  } catch (error) {
    dispatch(deleteUsersFailure(error.message));
    throw error;
  }
};
