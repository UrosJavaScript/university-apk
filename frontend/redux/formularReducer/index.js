import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  FETCH_FORM_DATA_SUCCESS,
  FETCH_FORM_DATA_FAILURE,
} from "../formularActions";

const initialState = {
  loading: false,
  formSubmissionError: null,
  formData: [],
};

const formularReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM_REQUEST:
      return {
        ...state,
        loading: true,
        formSubmissionError: null,
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        formData: [action.payload],
      };

    case SUBMIT_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        formSubmissionError: action.payload,
      };
    case FETCH_FORM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        formData: action.payload,
      };
    case FETCH_FORM_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default formularReducer;
