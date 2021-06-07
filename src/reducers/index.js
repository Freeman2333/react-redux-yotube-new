import { combineReducers } from "redux";
// reducers
import user from "./user";
import recommendation from "./recommendation";

export default combineReducers({
  user,
  recommendation,
});
