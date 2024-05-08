import { LOGIN, LOGOUT, SETBUGDATA } from "./ActionTypes";

const initialState = {
  auth: false,
  bugsdata: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: true,
      };
    case LOGOUT:
      return {
        ...state,
        auth: false,
      };
    case SETBUGDATA:
      return {
        ...state,
        bugsdata: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
