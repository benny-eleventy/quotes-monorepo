import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { S } from "vitest/dist/types-dea83b3d";
import { RootState } from "../store";

export interface ApiDetails {
	baseURL: string;
	headers: any;
}

export interface Pagination {
	currentPage: number | string;
	from: number;
	to: number;
	totalCount: number;
	totalPages: number;
}

export interface Status {
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
}

export interface AppData {
	personas: {
		results: any[];
		pagination: Pagination;
		status: Status;
	};
	quotes: {
		results: any[];
		pagination: Pagination;
		status: Status;
	};
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
	| "videos"
	| "persona";

export interface globalState {
	apiDetails: ApiDetails | null;
	appData: AppData;
}

const initialPagination: Pagination = {
	currentPage: 1,
	from: 0,
	to: 0,
	totalCount: 0,
	totalPages: 0,
};

const initialStatus: Status = {
	isLoading: false,
	isSuccess: false,
	isError: false,
};

const initialState: globalState = {
	apiDetails: {
		baseURL: "https://antilibrary-uat.deno.dev",
		headers: {
			"Content-Type": "application/json",
			"X-App-Source": "QUOTES-WEB-APP",
		},
	},
	appData: {
		personas: {
			results: [],
			pagination: initialPagination,
			status: initialStatus,
		},
		quotes: {
			results: [],
			pagination: initialPagination,
			status: initialStatus,
		},
	},
};

export interface SetAppDataPayload {
	entity: Entities;
	data: {
		results: any[];
		metaData: {
			pagination: any;
		};
	};
}

export interface GetNextPagePayload {
	entity: Entities;
	page: number;
}

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setApiDetails: (state, action: PayloadAction<ApiDetails>) => {
			state.apiDetails = action.payload;
		},
		setAppData: (state, action: PayloadAction<SetAppDataPayload>) => {
			const { entity, data } = action.payload;
			const {
				results,
				metaData: { pagination },
			} = data;

			const { currentPage } = pagination;

			if (currentPage === 1) {
				state.appData[entity as keyof typeof state.appData].results = results;
			} else {
				state.appData[entity as keyof typeof state.appData].results = [
					...state.appData[entity as keyof typeof state.appData].results,
					...results,
				];
			}
			state.appData[entity as keyof typeof state.appData].pagination =
				pagination;
		},
		getNextPage: (state, action: PayloadAction<GetNextPagePayload>) => {
			const { entity, page } = action.payload;
			state.appData[
				entity as keyof typeof state.appData
			].pagination.currentPage = page;
		},
		setDataStatus: (
			state,
			action: PayloadAction<{ entity: string; status: Status }>
		) => {
			const { entity, status } = action.payload;

			if (state.appData[entity as keyof typeof state.appData]) {
				state.appData[entity as keyof typeof state.appData].status = status;
			}
		},
	},
});

export const useGlobalState = () => {
	return useSelector((state: RootState) => state.global);
};

export const usePersonaGlobalState = () => {
	return useSelector((state: RootState) => state.global.appData.personas);
};

export const { setApiDetails, setAppData, getNextPage, setDataStatus } =
	globalSlice.actions;

export const globalReducer = globalSlice.reducer;
