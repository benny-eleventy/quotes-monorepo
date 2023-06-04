import { useApiInstance } from "./api-instance";

export const useGetPersonas = () => {
	const api = useApiInstance();

	const getPersonas = async () => {
		const response = await api.post("/get/personas", {
			pagination: {
				page: "1",
			},
		});
		console.log(response);
		return response.data;
	};

	return getPersonas;
};
