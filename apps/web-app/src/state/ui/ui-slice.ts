// ui-slice.js

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ToastMessage {
	id: string;
	message: string;
	type: "success" | "error" | "info"; // Add more types if needed
}

export interface UIState {
	toastMessages: ToastMessage[];
}

const initialState: UIState = {
	toastMessages: [],
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		addToastMessage: (
			state,
			action: PayloadAction<Omit<ToastMessage, "id">>
		) => {
			// Use a timestamp as a simple unique ID
			const id = Date.now().toString();
			state.toastMessages.push({ id, ...action.payload });
		},
		removeToastMessage: (state, action: PayloadAction<string>) => {
			state.toastMessages = state.toastMessages.filter(
				(toast) => toast.id !== action.payload
			);
		},
	},
});

export const { addToastMessage, removeToastMessage } = uiSlice.actions;
export const useUiState = () => useSelector((state: RootState) => state.ui);
export const uiReducer = uiSlice.reducer;
