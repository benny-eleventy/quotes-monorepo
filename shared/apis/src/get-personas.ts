import api from "./api-instance";

export const getPersonas = async () => {
	const response = await api.post(
		"/get/personas",
		{
			pagination: {
				page: "1",
			},
		},
		{
			headers: {
				"Content-Type": "application/json",
				"X-App-Source": "QUOTES-WEB-APP",
			},
		}
	);
	return response.data;
};
