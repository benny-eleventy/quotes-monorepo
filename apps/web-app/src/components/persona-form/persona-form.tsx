import { useDispatch } from "react-redux";
import { CenterAlignedColumnContainer, s, styled } from "@bennyui/core";
import { z } from "zod";
import {
	setFieldError,
	setFormStatus,
	setMultipleFieldErrors,
	updateField,
	useFormStatus,
	usePersonaFormErrors,
	usePersonaFormFields,
} from "state";
import { personaSchema } from "state";
import InputBox from "../input-box";
import { usePersonaFormActions } from "./use-persona-form-actions";

const PersonaForm = () => {
	const dispatch = useDispatch();

	const persona = usePersonaFormFields();
	const { isValidating, isSuccess, isError, isLoading } = useFormStatus();
	const personaFormErrors = usePersonaFormErrors();

	const { createOne, updateOne } = usePersonaFormActions();

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		//@ts-ignore
		dispatch(updateField({ entity: "persona", field: name, value }));

		if (isValidating) {
			const result = personaSchema
				.pick({ [name]: true })
				.safeParse({ [name]: value });

			if (result.success) {
				// If validation succeeds, update the field and clear any errors
				dispatch(
					setFieldError({
						entity: "persona",
						//@ts-ignore
						field: name,
						errorMessage: undefined,
					})
				);
			} else {
				//@ts-ignore
				const errorMessage = result.error.flatten().fieldErrors[name][0]; // get the first error message for this field
				dispatch(
					//@ts-ignore
					setFieldError({ entity: "persona", field: name, errorMessage })
				);
			}
		}
	};

	const handleSubmit = async () => {
		try {
			// dispatch(setValidating(true));
			dispatch(
				setFormStatus({
					isLoading: true,
					isValidating: true,
				})
			);
			const _persona = await personaSchema.parseAsync(persona);
			if (persona._id) {
				updateOne({ body: persona, entity: "persona", _id: persona._id });
			} else {
				createOne({ body: persona, entity: "persona" });
			}
		} catch (error) {
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
					setMultipleFieldErrors({ entity: "persona", errors: errorMessages })
				);
			}
		}
	};

	return (
		<FormWrapper>
			<InputBox
				value={persona.name}
				name="name"
				onChange={handleChange}
				placeholder="Name"
				isError={!!personaFormErrors.name}
				errorMessage={personaFormErrors.name?.[0]}
			/>

			<InputBox
				value={persona.imageUrls && persona.imageUrls[0]}
				name="imageUrls"
				onChange={handleChange}
				placeholder="imageUrl"
				isError={!!personaFormErrors.imageUrls}
				errorMessage={personaFormErrors.imageUrls?.[0]}
			/>

			<InputBox
				value={persona.role}
				name="role"
				onChange={handleChange}
				placeholder="Role"
				isError={!!personaFormErrors.role}
				errorMessage={personaFormErrors.role?.[0]}
			/>

			<SubmitButton onClick={() => handleSubmit()}>
				{isLoading
					? "Loading..."
					: isSuccess
					? "Success!"
					: isError
					? "Error!"
					: "Submit"}
			</SubmitButton>
		</FormWrapper>
	);
};

export { PersonaForm };

const FormWrapper = styled(CenterAlignedColumnContainer)`
	width: 400px;
	margin: 0 auto;
	height: auto;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	border: 1px solid white;
	padding: 2rem;
`;

const SubmitButton = styled(s.Button)`
	width: 80%;
	border: 1px solid rgba(255, 255, 255, 0.4);
	background: lightpink;
	color: black;
	padding: 1rem;
`;
