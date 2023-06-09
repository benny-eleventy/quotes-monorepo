import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { formReducers } from "./form-reducer";
import { initialState } from "./form-state";

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: formReducers,
});

export const usePersonaFormFields = () => {
	return useSelector((state: RootState) => state.form.fields.persona);
};

export const useQuotesFormFields = () => {
	return useSelector((state: RootState) => state.form.fields.quotes);
};

export const usePersonaFormErrors = () => {
	return useSelector((state: RootState) => state.form.errors.persona);
};

export const quotesFormErrors = () => {
	return useSelector((state: RootState) => state.form.errors.quotes);
};

export const useFormStatus = () => {
	return useSelector((state: RootState) => state.form.status);
};

export const {
	updateField,
	loadFormData,
	setMultipleFieldErrors,
	clearAllErrors,
	setFieldError,
	setValidating,
	clearForm,
	setFormStatus,
} = formSlice.actions;

export const formReducer = formSlice.reducer;
