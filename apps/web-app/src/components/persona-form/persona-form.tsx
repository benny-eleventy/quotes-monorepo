/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useDispatch } from "react-redux";
import { CenterAlignedColumnContainer, styled } from "@bennyui/core";
import {
	setFieldError,
	updateField,
	useFormStatus,
	usePersonaFormErrors,
	usePersonaFormFields,
} from "state";
import { personaSchema } from "state";
import InputBox from "../input-box";
import Submit from "./submit-button";

const PersonaForm = () => {
	const dispatch = useDispatch();

	const persona = usePersonaFormFields();
	const { isValidating } = useFormStatus();
	const personaFormErrors = usePersonaFormErrors();

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
			<Submit />
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
