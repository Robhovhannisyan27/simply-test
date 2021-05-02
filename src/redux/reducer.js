import { combineReducers } from "redux";

import userReducer from "./user/reducer";
import restaurantReducer from "./restaurant/reducer";

export default combineReducers({
  user: userReducer,
  restaurant: restaurantReducer,
});
