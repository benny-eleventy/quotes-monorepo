import { useContext } from "react";
import { ApiContext } from "./api-context";
import { useApiInstance } from "./api-instance";
import React from "react";

export const useCreatePersonaAPI = () => {
	const api = useApiInstance();

	const createPersona = async ({ data }: any) => {
		const response = await api.post("/create/persona", data);
		return response.data;
	};

	return createPersona;
};
