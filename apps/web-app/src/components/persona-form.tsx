import { StyledInput, StyledButton } from "components";
import { useDispatch } from "react-redux";
import { updateField, usePersonaFormFields } from "state";
import { useCreatePersona } from "hooks";
import { addToastMessage } from "../state";

const PersonaForm = () => {
	const dispatch = useDispatch();

	const persona = usePersonaFormFields();
	const { createOne } = useCreatePersona();

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		//@ts-ignore
		dispatch(updateField({ entity: "persona", field: name, value }));
	};

	const handleSubmit = async () => {
		try {
			createOne({ data: persona });
			dispatch(
				addToastMessage({
					message: "Persona created successfully",
					type: "success",
				})
			);
		} catch (error) {
			dispatch(
				addToastMessage({
					message: "An error occurred while creating the persona",
					type: "error",
				})
			);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "400px",
				margin: "0 auto",
				height: "auto",
				alignItems: "center",
				justifyContent: "center",
				gap: "1rem",
				border: "1px solid white",
				padding: "2rem",
			}}
		>
			<>
				<StyledInput
					type="text"
					name="name"
					value={persona.name}
					onChange={handleChange}
					placeholder="Name"
				/>
			</>
			<>
				<StyledInput
					type="text"
					name="imageUrl"
					value={persona.imageUrls}
					onChange={handleChange}
					placeholder="Image URL"
				/>
			</>
			<>
				<StyledInput
					type="text"
					name="role"
					value={persona.role}
					onChange={handleChange}
					placeholder="Role"
				/>
			</>
			<StyledButton onClick={() => handleSubmit()}>Submit</StyledButton>
		</div>
	);
};

export default PersonaForm;
