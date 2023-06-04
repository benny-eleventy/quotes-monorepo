/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { Entities, RootState } from "state";
import { useApiInstance } from "apis";
import { useSelector } from "react-redux";

interface MutationInput {
	body: any;
	entity: Entities;
}

interface UseCreateOptions {
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
}

export const useCreate = ({ onSuccess, onError }: UseCreateOptions) => {
	const { apiDetails } = useSelector((state: RootState) => state.global);
	const api = useApiInstance();

	const createOne = async ({ entity, body }: MutationInput) => {
		const response = await api.post(`/create/${entity}`, body);
		return response.data;
	};

	return useMutation<any, unknown, MutationInput>({
		mutationFn: ({ body, entity }) => createOne({ entity, body }),
		onSuccess: (data) => {
			if (onSuccess) {
				onSuccess(data);
			}
		},
		onError: (error) => {
			if (onError) {
				onError(error);
			}
		},
	});
};
