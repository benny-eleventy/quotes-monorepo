import { StyledInput, StyledButton } from "components";
import { useDispatch } from "react-redux";
import { updateField, usePersonaFormFields } from "state";
import { useCreatePersona } from "hooks";

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
			<StyledButton
				onClick={() => {
					createOne({ data: persona });
				}}
			>
				Submit
			</StyledButton>
		</div>
	);
};

export default PersonaForm;
