import * as types from "./types";

const initialState = {
  data: JSON.parse(localStorage.getItem("users")) || [],
  authUser: {},
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        authUser: action.payload,
      };
    case types.REGISTER_NEW_USER:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case types.LOGOUT:
      return {
        ...state,
        authUser: {},
      };
    default:
      return state;
  }
}
