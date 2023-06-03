import { useApiInstance } from "./api-instance";

export const useCreatePersonaAPI = () => {
	const api = useApiInstance();

	const createPersona = async ({ data }: any) => {
		const response = await api.post("/create/persona", data);
		return response.data;
	};

	return createPersona;
};
