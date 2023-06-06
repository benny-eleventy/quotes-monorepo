/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { clearForm, Entities } from "state";
import { useApiInstance } from "apis";

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
			if (onCreateError) {
				onCreateError(error);
			}
		},
	});
	return { createOne, ...rest };
};
