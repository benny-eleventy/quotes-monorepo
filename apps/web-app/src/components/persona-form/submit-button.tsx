/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";
import { s } from "@bennyui/core";
import { setFormStatus, usePersonaFormFields, useFormStatus } from "state";
import { useCreateOne, useUpdateOne } from "hooks";
import { addToastMessage } from "../../state";

const Submit = () => {
	const dispatch = useDispatch();
	const persona = usePersonaFormFields();
	const queryClient = useQueryClient();

	const theme = useTheme();

	const { isSuccess, isError, isLoading } = useFormStatus();

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

	const onCreateError = (_error: any) => {
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

	const { createOne: createPesrona } = useCreateOne({
		entity: "persona",
		onCreateSuccess,
		onCreateError,
	});

	const { updateOne } = useUpdateOne({
		onUpdateSuccess,
		onUpdateError,
	});

	const handleSubmit = async () => {
		if (persona._id) {
			updateOne({ body: persona, entity: "persona", _id: persona._id });
		} else {
			createPesrona({ body: persona });
		}
	};

	return (
		<>
			<SubmitButton
				onClick={() => handleSubmit()}
				color={theme && theme.error_color}
			>
				{isLoading
					? "Loading..."
					: isSuccess
					? "Success!"
					: isError
					? "Error!"
					: "Submit"}
			</SubmitButton>
		</>
	);
};

export default Submit;

const SubmitButton = styled(s.Button)`
	width: 80%;
	border: 1px solid rgba(255, 255, 255, 0.4);
	background: ${(props) => props.theme.color_100};
	color: black;
	padding: 1rem;
`;
