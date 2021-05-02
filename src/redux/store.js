import { createStore } from "redux";
// import {createLogger} from 'redux-logger';
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
