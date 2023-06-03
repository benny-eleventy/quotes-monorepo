import axios, { AxiosInstance } from "axios";
import { useGlobalState } from "state";

export const useApiInstance = () => {
	const { apiDetails } = useGlobalState();
	return axios.create({
		baseURL: apiDetails?.baseURL,
		headers: apiDetails?.headers,
	});
};
