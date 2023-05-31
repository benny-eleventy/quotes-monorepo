import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonaFields {
	name: string;
	imageUrl: string;
	age: number;
}

interface QuotesFields {
	quote: string;
	persona: string;
}

export interface FormState {
	currentEntity: string;
	fields: {
		persona: PersonaFields;
		quotes: QuotesFields;
	};
}

type Entity = "persona" | "quotes";
type PersonaField = "name" | "imageUrl" | "age";
type QuotesField = "quote" | "persona";
type Field = PersonaField | QuotesField;

const initialState: FormState = {
	currentEntity: "none",
	fields: {
		persona: {
			name: "persona",
			imageUrl: "https://via.placeholder.com/150",
			age: 0,
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
				//@ts-ignore
				(state.fields[entity] as PersonaFields)[field as PersonaField] = value;
			} else if (entity === "quotes") {
				(state.fields[entity] as QuotesFields)[field as QuotesField] = value;
			}
		},
	},
});

export const { updateField } = formSlice.actions;

export const formReducer = formSlice.reducer;
