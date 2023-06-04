/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { Entities } from "state";
import { useApiInstance } from "apis";

interface MutationInput {
	_id: string | number;
	entity: Entities;
}

interface UseDeleteOptions {
	onDeleteSuccess?: (data: any) => void;
	onDeleteError?: (error: any) => void;
}

export const useDeleteOne = ({
	onDeleteSuccess,
	onDeleteError,
}: UseDeleteOptions) => {
	const api = useApiInstance();

	const deleteOne = async ({ entity, _id }: MutationInput) => {
		const response = await api.delete(`/delete/${entity}/${_id}`);
		return response.data;
	};

	const { mutate: deleteOneMutation, ...rest } = useMutation<
		any,
		unknown,
		MutationInput
	>({
		mutationFn: ({ _id, entity }) => deleteOne({ entity, _id }),
		onSuccess: (data) => {
			if (onDeleteError) {
				onDeleteSuccess(data);
			}
		},
		onError: (error) => {
			if (onDeleteError) {
				onDeleteError(error);
			}
		},
	});
	return { deleteOne: deleteOneMutation, ...rest };
};
