import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface QuotesFields {
	quote: string;
	persona: string;
}

interface PersonaFields {
	_id?: string;
	name: string;
	imageUrls: string[];
	role: string;
}

export interface FormState {
	currentEntity: string;
	fields: {
		persona: PersonaFields;
		quotes: QuotesFields;
	};
}

type Entity = "persona" | "quotes";
type PersonaField = "name" | "imageUrls" | "role";
type QuotesField = "quote" | "persona";
type Field = PersonaField | QuotesField;

const initialState: FormState = {
	currentEntity: "none",
	fields: {
		persona: {
			_id: "",
			name: "",
			imageUrls: [],
			role: "Persona",
		},
		quotes: {
			quote: "",
			persona: "",
		},
	},
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		updateField: (
			state,
			action: PayloadAction<{ entity: Entity; field: Field; value: any }>
		) => {
			const { entity, field, value } = action.payload;
			state.currentEntity = entity;
			if (entity === "persona") {
				if (field == "imageUrls") {
					state.fields.persona.imageUrls.push(value);
				} else {
					(state.fields[entity] as PersonaFields)[field as PersonaField] =
						value;
				}
			} else if (entity === "quotes") {
				(state.fields[entity] as QuotesFields)[field as QuotesField] = value;
			}
		},
		loadFormData: (
			state,
			action: PayloadAction<{
				entity: Entity;
				data: PersonaFields | QuotesFields;
			}>
		) => {
			const { entity, data } = action.payload;
			const currentEntity = (state.currentEntity = entity);
			// @ts-ignore
			state.fields[currentEntity] = data;
		},
	},
});

export const usePersonaFormFields = () => {
	return useSelector((state: RootState) => state.form.fields.persona);
};

export const useQuotesFormFields = () => {
	return useSelector((state: RootState) => state.form.fields.quotes);
};

export const { updateField, loadFormData } = formSlice.actions;

export const formReducer = formSlice.reducer;
