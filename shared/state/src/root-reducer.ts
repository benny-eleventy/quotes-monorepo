import { combineReducers } from "@reduxjs/toolkit";
import { formReducer } from "./form";
import { globalReducer } from "./global";

export const rootReducer = combineReducers({
	form: formReducer,
	global: globalReducer,
});
