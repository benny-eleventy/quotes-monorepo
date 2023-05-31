import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
