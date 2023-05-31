import api from "./api-instance";

export interface createPersonaOptions {
	data: {
		name: string;
		imageUrls: string[];
		role: string;
	};
}

export const createPersona = async ({ data }: createPersonaOptions) => {
	const response = await api.post("/create/persona", data, {
		headers: {
			"Content-Type": "application/json",
			"X-App-Source": "QUOTES-WEB-APP",
		},
	});
	return response.data;
};
