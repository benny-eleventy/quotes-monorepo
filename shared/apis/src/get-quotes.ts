import api from "./api-instance";

export const getQuotes = async () => {
	const response = await api.post("/get/quotes", {
		pagination: {
			page: "1",
		},
	});
	return response.data;
};
