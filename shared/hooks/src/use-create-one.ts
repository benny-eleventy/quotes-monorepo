/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
	clearForm,
	Entities,
	personaSchema,
	setFormStatus,
	setMultipleFieldErrors,
} from "state";
import { useApiInstance } from "apis";
import { z } from "zod";

interface MutationInput {
	body: any;
}

interface UseCreateOptions {
	onCreateSuccess?: (data: any) => void;
	onCreateError?: (error: any) => void;
	entity?: Entities;
}

export const useCreateOne = ({
	onCreateSuccess,
	onCreateError,
	entity,
}: UseCreateOptions) => {
	const api = useApiInstance();
	const dispatch = useDispatch();

	const createOneAPI = async ({ body }: MutationInput) => {
		dispatch(
			setFormStatus({
				isLoading: true,
				isValidating: true,
			})
		);
		const _persona = await personaSchema.parseAsync({ ...body });
		const response = await api.post(`/create/${entity}`, body);
		return response.data;
	};

	const { mutate: createOne, ...rest } = useMutation<
		any,
		unknown,
		MutationInput
	>({
		mutationFn: ({ body }) => createOneAPI({ body }),
		onSuccess: (data) => {
			if (onCreateSuccess) {
				dispatch(clearForm());
				onCreateSuccess(data);
			}
		},
		onError: (error) => {
			console.log(error, "send this to sentry");
			dispatch(setFormStatus({ isLoading: false }));

			if (error instanceof z.ZodError) {
				//TODO: handle zod errors
				const errorMessages: Record<string, string[]> = {};
				for (const issue of error.issues) {
					const field = issue.path[0];
					if (field) {
						if (!errorMessages[field]) {
							errorMessages[field] = [];
						}
						errorMessages[field].push(issue.message);
					}
				}
				dispatch(
					setMultipleFieldErrors({
						entity: "persona",
						errors: errorMessages,
					})
				);
			} else {
				if (onCreateError) {
					onCreateError(error);
				}
			}
		},
	});
	return { createOne, ...rest };
};
