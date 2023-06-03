import { Entities } from "state";
import { useApiInstance } from "./api-instance";

export const useGetAllAPI = () => {
	const api = useApiInstance();

	const getAll = async ({ entity }: { entity: Entities }) => {
		const response = await api.post(`/get/${entity}`, {
			pagination: {
				page: "1",
			},
		});
		return response.data;
	};

	return getAll;
};
