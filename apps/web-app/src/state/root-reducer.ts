import { combineReducers } from "@reduxjs/toolkit";
import { formReducer, globalReducer } from "state"; // Assuming 'state' is the package where rootReducer is defined
import { uiReducer } from "./ui";

export const rootReducer = combineReducers({
	form: formReducer,
	ui: uiReducer,
	global: globalReducer,
});
