import * as types from "./types";

const initialState = {
  restaurants: JSON.parse(localStorage.getItem("restaurants")) || [],
  restaurant: {},
};
export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_RESTAURANT:
      return {
        ...state,
        restaurant: state.restaurants.find(
          (restaurant) => restaurant.id == action.payload
        ),
      };
    case types.SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };
    case types.ADD_REVIEW:
      return {
        ...state,
        restaurants: action.payload,
      };
    default:
      return state;
  }
}
