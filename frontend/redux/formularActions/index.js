import axios from "axios";
import { API_URL } from "../../apiUrl";

// Action types for form submission
export const SUBMIT_FORM_REQUEST = "SUBMIT_FORM_REQUEST";
export const SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS";
export const SUBMIT_FORM_FAILURE = "SUBMIT_FORM_FAILURE";

// fetch all data
export const FETCH_FORM_DATA_SUCCESS = "FETCH_FORM_DATA_SUCCESS";
export const FETCH_FORM_DATA_FAILURE = "FETCH_FORM_DATA_FAILURE";

// update
export const UPDATE_FORM_DATA_REQUEST = "UPDATE_FORM_DATA_REQUEST";
export const UPDATE_FORM_DATA_SUCCESS = "UPDATE_FORM_DATA_SUCCESS";
export const UPDATE_FORM_DATA_FAILURE = "UPDATE_FORM_DATA_FAILURE";

// delete
export const DELETE_FORM_DATA_REQUEST = "DELETE_FORM_DATA_REQUEST";
export const DELETE_FORM_DATA_SUCCESS = "DELETE_FORM_DATA_SUCCESS";
export const DELETE_FORM_DATA_FAILURE = "DELETE_FORM_DATA_FAILURE";



// Action creators for form submission
export const submitFormRequest = () => ({
  type: SUBMIT_FORM_REQUEST,
});

export const submitFormSuccess = (formData) => ({
  type: SUBMIT_FORM_SUCCESS,
  payload: formData,
});

export const submitFormFailure = (error) => ({
  type: SUBMIT_FORM_FAILURE,
  payload: error,
});

export const fetchFormDataSuccess = (formData) => ({
  type: FETCH_FORM_DATA_SUCCESS,
  payload: formData,
});

export const fetchFormDataFailure = (error) => ({
  type: FETCH_FORM_DATA_FAILURE,
  payload: error,
});
// Action creators for updating form data
export const updateFormDataRequest = () => ({
  type: UPDATE_FORM_DATA_REQUEST,
});

export const updateFormDataSuccess = (updatedData) => ({
  type: UPDATE_FORM_DATA_SUCCESS,
  payload: updatedData,
});

export const updateFormDataFailure = (error) => ({
  type: UPDATE_FORM_DATA_FAILURE,
  payload: error,
});

export const deleteFormDataRequest = () => ({
  type: DELETE_FORM_DATA_REQUEST,
});

export const deleteFormDataSuccess = () => ({
  type: DELETE_FORM_DATA_SUCCESS,
});

export const deleteFormDataFailure = (error) => ({
  type: DELETE_FORM_DATA_FAILURE,
  payload: error,
});

export const submitFormAsync = (formData) => async (dispatch) => {
  try {
    dispatch(submitFormRequest());

    const token = localStorage.getItem("jwtToken"); 

    const response = await axios.post(
      `${API_URL}formData`, 
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Hello ${token}`,
        },
      }
    );

    localStorage.setItem("formData", JSON.stringify(response.data));

    dispatch(submitFormSuccess(response.data));
  } catch (error) {
    dispatch(submitFormFailure(error.message));
  }
};

export const fetchFormData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken"); 

    const response = await axios.get(`${API_URL}formData`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    dispatch(fetchFormDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchFormDataFailure(error.message));
  }
};

export const updateFormDataAsync = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateFormDataRequest()); 

    const token = localStorage.getItem("jwtToken"); 

    const response = await axios.put(
      `${API_URL}updateFormData/${id}`, 
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(updateFormDataSuccess(response.data)); 

    return response.data; 
  } catch (error) {
    dispatch(updateFormDataFailure(error.message)); 
    throw error; 
  }
};

export const deleteFormDataAsync = (id) => async (dispatch) => {
  try {
    dispatch(deleteFormDataRequest()); 

    const token = localStorage.getItem("jwtToken"); 

    await axios.delete(`${API_URL}deleteFormData/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteFormDataSuccess()); 
  } catch (error) {
    dispatch(deleteFormDataFailure(error.message)); 
    throw error;
  }
};
