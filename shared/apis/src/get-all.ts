import { Entities } from "state";
import { useApiInstance } from "./api-instance";

export const useGetAllAPI = () => {
	const api = useApiInstance();

	const getAll = async ({
		entity,
		page,
	}: {
		entity: Entities;
		page: number;
	}) => {
		const response = await api.post(`/get/${entity}`, {
			pagination: {
				page,
				limit: 10,
			},
		});
		return response.data;
	};

	return getAll;
};
