import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface ApiDetails {
	baseURL: string;
	headers: any;
}

export interface AppData {
	personas: any[];
	quotes: any[];
}

//TODO: get this type from the server types
export type Entities =
	| "tags"
	| "groups"
	| "tweets"
	| "resources"
	| "personas"
	| "books"
	| "quotes"
	| "videos";

export interface globalState {
	apiDetails: ApiDetails | null;
	appData?: AppData;
}

const initialState: globalState = {
	apiDetails: null,
	appData: {
		personas: [],
		quotes: [],
	},
};

export interface SetAppDataPayload {
	entity: Entities;
	data: any[];
}

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setApiDetails: (state, action: PayloadAction<ApiDetails>) => {
			state.apiDetails = action.payload;
		},
		setAppData: (state, action: PayloadAction<SetAppDataPayload>) => {
			console.log("action", action);
			const { entity, data } = action.payload;
			if (state.appData) {
				state.appData[entity as keyof typeof state.appData] = data;
			}
		},
	},
});

export const useGlobalState = () => {
	return useSelector((state: RootState) => state.global);
};

export const { setApiDetails, setAppData } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
