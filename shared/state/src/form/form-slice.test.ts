import { describe, expect, it } from "vitest";
import { formReducer, updateField } from "./form-slice";

describe("formSlice", () => {
	it("should handle initial state", () => {
		expect(formReducer(undefined, { type: "" })).toEqual({
			currentEntity: "none",
			fields: {
				persona: {
					name: "",
					imageUrls: [],
					role: "Persona",
				},
				quotes: {
					quote: "",
					persona: "",
				},
			},
		});
	});

	it("should handle updateField for persona", () => {
		const previousState = {
			currentEntity: "none",
			fields: {
				persona: {
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

		const action = updateField({
			entity: "persona",
			field: "name",
			value: "Alice",
		});

		expect(formReducer(previousState, action)).toEqual({
			currentEntity: "persona",
			fields: {
				persona: {
					name: "Alice",
					imageUrls: [],
					role: "Persona",
				},
				quotes: {
					quote: "",
					persona: "",
				},
			},
		});
	});

	it("should handle updateField for quotes", () => {
		const previousState = {
			currentEntity: "none",
			fields: {
				persona: {
					name: "Alice",
					imageUrls: [],
					role: "Persona",
				},
				quotes: {
					quote: "",
					persona: "",
				},
			},
		};

		const action = updateField({
			entity: "quotes",
			field: "quote",
			value: "This is a quote",
		});

		expect(formReducer(previousState, action)).toEqual({
			currentEntity: "quotes",
			fields: {
				persona: {
					name: "Alice",
					imageUrls: [],
					role: "Persona",
				},
				quotes: {
					quote: "This is a quote",
					persona: "",
				},
			},
		});
	});

	it("should handle updateField for persona image url", () => {
		const previousState = {
			currentEntity: "none",
			fields: {
				persona: {
					name: "Alice",
					imageUrls: [],
					role: "Persona",
				},
				quotes: {
					quote: "",
					persona: "",
				},
			},
		};

		const action = updateField({
			entity: "persona",
			field: "imageUrls",
			value: "https://example.com/image1.png",
		});

		expect(formReducer(previousState, action)).toEqual({
			currentEntity: "persona",
			fields: {
				persona: {
					name: "Alice",
					imageUrls: ["https://example.com/image1.png"],
					role: "Persona",
				},
				quotes: {
					quote: "",
					persona: "",
				},
			},
		});
	});
});
