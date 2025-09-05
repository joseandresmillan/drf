import { combineReducers } from "redux";
import useCasesReducer from "./useCasesSlice";

export default combineReducers({
	useCases: useCasesReducer
})