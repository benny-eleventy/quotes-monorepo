import { useMutation } from "@tanstack/react-query";
import { createPersona, createPersonaOptions } from "apis";

export const useCreatePersona = () => {
	const mutation = useMutation((personaData: createPersonaOptions) =>
		createPersona(personaData)
	);

	const createOne = (data: createPersonaOptions) => {
		mutation.mutate(data);
	};

	return { ...mutation, createOne };
};
