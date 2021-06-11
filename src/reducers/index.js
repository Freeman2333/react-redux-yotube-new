import { combineReducers } from "redux";
// reducers
import user from "./user";
import recommendation from "./recommendation";
import sidebar from "./sidebar";

export default combineReducers({
  user,
  recommendation,
  sidebar
});
