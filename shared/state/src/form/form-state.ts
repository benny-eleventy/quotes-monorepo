import { z } from "zod";

export interface QuotesFields {
	quote: string;
	persona: string;
}

export const personaSchema = z.object({
	_id: z.string().optional(),
	name: z.string().min(3, "Name must be at least 3 characters long"),
	imageUrls: z.array(z.string()).optional(),
	role: z.enum([
		"Persona",
		"QuotesPersona",
		"Author",
		"Translator",
		"NotAPersona",
		"Narrator",
	]),
});

export type PersonaFields = z.infer<typeof personaSchema>;

export type PersonaField = keyof PersonaFields;
export type QuotesField = "quote" | "persona";

export type Entity = "persona" | "quotes";

export type Field = PersonaField | QuotesField;

export interface FormState {
	currentEntity: string;
	fields: {
		persona: PersonaFields;
		quotes: QuotesFields;
	};
	errors: {
		persona: Partial<Record<PersonaField, string[]>>;
		quotes: Partial<Record<QuotesField, string[]>>;
	};
	status: {
		isValidating: boolean;
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
}

export const initialState: FormState = {
	currentEntity: "none",
	fields: {
		persona: {
			_id: "",
			name: "",
			imageUrls: [],
			// @ts-ignore
			role: "",
		},
		quotes: {
			quote: "",
			persona: "",
		},
	},
	errors: {
		persona: {},
		quotes: {},
	},
	status: {
		isValidating: false,
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
};
