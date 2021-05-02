import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "./selector";
import { setRestaurants, addReview, getRestaurant } from "./actions";

export const useRestaurant = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(getRestaurants);

  function showRestaurant(id) {
    const restaurant = restaurants.find((item) => item.id == id);
    if (!restaurant) {
      return {
        success: false,
        message: "Something went wrong!",
      };
    }
    dispatch(getRestaurant(id));
    return {
      success: true,
      restaurant: restaurant,
    };
  }

  function handleReview(id, review) {
    restaurants.map((restaurant) => {
      if (restaurant.id == id) {
        restaurant.comments.push(review);
      }
      return restaurant;
    });

    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    dispatch(addReview(restaurants));
    return {
      success: true,
    };
  }

  function handleSetRestaurants(restaurants) {
    dispatch(setRestaurants(restaurants));
    return {
      success: true,
    };
  }

  return {
    restaurants,
    handleReview,
    handleSetRestaurants,
    showRestaurant,
  };
};
