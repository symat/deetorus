import { combineReducers } from "redux";
import { navbar } from "./components/navbar/navbar-reducer";
import { dataModel } from "./data-model/data-model-reducer";

export const allReducers = combineReducers({
  navbar,
  dataModel
});
