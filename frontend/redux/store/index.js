import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer"; // Update the path accordingly

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
