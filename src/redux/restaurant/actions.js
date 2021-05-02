import * as types from "./types";

export const setRestaurants = (payload) => ({
  type: types.SET_RESTAURANTS,
  payload,
});

export const getRestaurant = (payload) => ({
  type: types.GET_RESTAURANT,
  payload,
});

export const addReview = (payload) => ({
  type: types.ADD_REVIEW,
  payload,
});
