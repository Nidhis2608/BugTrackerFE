import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "../redux/authReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
