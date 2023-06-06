/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { clearForm, Entities } from "state";
import { useApiInstance } from "apis";
import { useDispatch } from "react-redux";

interface MutationInput {
	_id: string | number;
	entity: Entities;
	body: any;
}

interface UseUpdateOptions {
	onUpdateSuccess?: (data: any) => void;
	onUpdateError?: (error: any) => void;
}

export const useUpdateOne = ({
	onUpdateSuccess,
	onUpdateError,
}: UseUpdateOptions) => {
	const api = useApiInstance();
	const dispatch = useDispatch();

	const updateOne = async ({ entity, _id, body }: MutationInput) => {
		const response = await api.patch(`/update/${entity}/${_id}`, body);
		return response.data;
	};

	const { mutate: updateOneMutation, ...rest } = useMutation<
		any,
		unknown,
		MutationInput
	>({
		mutationFn: ({ _id, entity, body }) => updateOne({ entity, _id, body }),
		onSuccess: (data) => {
			if (onUpdateError) {
				dispatch(clearForm());
				onUpdateSuccess(data);
			}
		},
		onError: (error) => {
			if (onUpdateError) {
				onUpdateError(error);
			}
		},
	});
	return { updateOne: updateOneMutation, ...rest };
};
