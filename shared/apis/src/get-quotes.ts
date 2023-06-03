import { AxiosInstance } from "axios";
import { useApiInstance } from "./api-instance";

interface getPersonasParams {
	apiDetails: {
		baseURL: string;
		headers: any;
	} | null;
}

export const getQuotes = async ({ apiDetails }: getPersonasParams) => {
	const api = useApiInstance();

	const response = await api.post("/get/personas", {
		pagination: {
			page: "1",
		},
	});
	return response.data;
};
