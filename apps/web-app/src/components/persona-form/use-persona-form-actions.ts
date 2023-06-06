// usePersonaFormActions.ts
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { setFormStatus } from "state";

import { useCreateOne, useUpdateOne } from "hooks";
import { addToastMessage } from "../../state";

export const usePersonaFormActions = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const onCreateSuccess = (_data: any) => {
		dispatch(
			setFormStatus({
				isLoading: false,
				isSuccess: true,
			})
		);

		setTimeout(() => {
			dispatch(setFormStatus({ isSuccess: false }));
		}, 800);

		queryClient.invalidateQueries({ queryKey: ["personas"] });

		dispatch(
			addToastMessage({
				message: "Persona created successfully",
				type: "success",
			})
		);
	};

	const onCreateError = (error: any) => {
		console.log(error);

		dispatch(
			setFormStatus({
				isError: true,
				isLoading: false,
			})
		);

		setTimeout(() => {
			dispatch(
				setFormStatus({
					isError: false,
					isLoading: false,
				})
			);
		}, 800);

		dispatch(
			addToastMessage({
				message: "An error occurred while creating the persona",
				type: "error",
			})
		);
	};

	const onUpdateSuccess = (_data: any) => {
		queryClient.invalidateQueries({ queryKey: ["personas"] });

		dispatch(
			addToastMessage({
				message: "Persona updated successfully",
				type: "success",
			})
		);
	};

	const onUpdateError = (_error: any) => {
		dispatch(
			addToastMessage({
				message: "An error occurred while updating the persona",
				type: "error",
			})
		);
	};

	const { createOne } = useCreateOne({
		onCreateSuccess,
		onCreateError,
	});

	const { updateOne } = useUpdateOne({
		onUpdateSuccess,
		onUpdateError,
	});

	return {
		createOne,
		updateOne,
	};
};
