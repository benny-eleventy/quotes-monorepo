import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface ApiDetails {
	baseURL: string;
	headers: any;
}

export interface globalState {
	apiDetails: ApiDetails | null;
}

const initialState: globalState = {
	apiDetails: null,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setApiDetails: (state, action: PayloadAction<ApiDetails>) => {
			state.apiDetails = action.payload;
		},
	},
});

export const useGlobalState = () => {
	return useSelector((state: RootState) => state.global);
};

export const { setApiDetails } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
