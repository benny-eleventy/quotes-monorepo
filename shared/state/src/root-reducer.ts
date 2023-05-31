import { combineReducers } from "@reduxjs/toolkit";
import { formReducer } from "./form";

export const rootReducer = combineReducers({
	form: formReducer,
});
