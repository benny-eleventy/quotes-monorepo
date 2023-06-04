import { s } from "@bennyui/core";
import { useQueryClient } from "@tanstack/react-query";
import { useCreate } from "hooks";
import { useDispatch } from "react-redux";
import { updateField, usePersonaFormFields } from "state";
import { addToastMessage } from "../state";

const PersonaForm = () => {
	const dispatch = useDispatch();

	const persona = usePersonaFormFields();

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		// @ts-ignore
		dispatch(updateField({ entity: "persona", field: name, value }));
	};

	const queryClient = useQueryClient();

	const onSuccess = (_data: any) => {
		queryClient.invalidateQueries({ queryKey: ["personas"] });
		dispatch(
			addToastMessage({
				message: "Persona created successfully",
				type: "success",
			})
		);
	};

	const onError = (_error: any) => {
		dispatch(
			addToastMessage({
				message: "An error occurred while creating the persona",
				type: "error",
			})
		);
	};

	const { mutate: createOne } = useCreate({
		onSuccess,
		onError,
	});

	const handleSubmit = async () => {
		createOne({ body: persona, entity: "persona" });
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
				<s.InputText
					type="text"
					name="name"
					value={persona.name}
					onChange={handleChange}
					placeholder="Name"
					style={{
						width: "100%",
						border: "1px solid rgba(255,255,255,0.4)",
						padding: "1rem",
						color: "lightblue",
					}}
				/>
			</>
			<>
				<s.InputText
					type="text"
					name="imageUrl"
					//@ts-ignore
					value={persona.imageUrls}
					onChange={handleChange}
					placeholder="Image URL"
					style={{
						width: "100%",
						border: "1px solid rgba(255,255,255,0.4)",
						color: "lightblue",
						padding: "1rem",
					}}
				/>
			</>
			<>
				<s.InputText
					type="text"
					name="role"
					value={persona.role}
					onChange={handleChange}
					placeholder="Role"
					style={{
						width: "100%",
						border: "1px solid rgba(255,255,255,0.4)",
						color: "lightblue",
						padding: "1rem",
					}}
				/>
			</>
			<s.Button
				dataTestId="submit-button"
				style={{
					width: "80%",
					border: "1px solid rgba(255,255,255,0.4)",
					background: "lightpink",
					color: "black",
					padding: "1rem",
				}}
				onClick={() => handleSubmit()}
			>
				Submit
			</s.Button>
		</div>
	);
};

export default PersonaForm;
