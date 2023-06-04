import { useMutation } from "@tanstack/react-query";
import { useCreatePersonaAPI } from "apis";

interface createPersonaOptions {
	name: string;
	imageUrl: string;
	role: string;
}

export const useCreatePersona = () => {
	const createPersona = useCreatePersonaAPI();

	const mutation = useMutation((personaData: createPersonaOptions) =>
		createPersona(personaData)
	);

	const createOne = (data: createPersonaOptions) => {
		mutation.mutate(data);
	};

	return { ...mutation, createOne };
};
