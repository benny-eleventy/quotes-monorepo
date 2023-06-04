import { loadFormData, useGlobalState } from "state";
import {
	CenterAlignedColumnContainer,
	CenterAlignedRowContainer,
	WrappedFlexStartRowContainer,
} from "@bennyui/core";
import { useDeleteOne, useUpdateOne } from "hooks";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { addToastMessage } from "../state";
const Personas = () => {
	const {
		appData: { personas },
	} = useGlobalState();

	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const onDeleteSuccess = (_data: any) => {
		queryClient.invalidateQueries({ queryKey: ["personas"] });
		dispatch(
			addToastMessage({
				message: "Persona deleted successfully",
				type: "success",
			})
		);
	};

	const onDeleteError = (_error: any) => {
		dispatch(
			addToastMessage({
				message: "An error occurred while deleting the persona",
				type: "error",
			})
		);
	};

	const { deleteOne } = useDeleteOne({
		onDeleteSuccess,
		onDeleteError,
	});

	const handleRemove = ({ _id }: { _id: string }) => {
		deleteOne({ entity: "persona", _id });
	};

	const handleUpdate = ({
		persona,
	}: {
		persona: { _id: string; name: string; description: string };
	}) => {
		dispatch(
			loadFormData({
				entity: "persona",
				data: persona,
			})
		);
	};

	return (
		<WrappedFlexStartRowContainer
			style={{
				width: "100%",
				height: "auto",
			}}
		>
			{personas.map(
				(persona: { _id: string; name: string; description: string }) => {
					return (
						<CenterAlignedColumnContainer
							style={{
								background: "lightblue",
								margin: "0.5rem",
								padding: "0.2rem",
								height: "auto",
								width: "240px",
								color: "black",
								position: "relative",
							}}
							key={persona._id}
						>
							<CenterAlignedRowContainer
								style={{
									position: "absolute",
									top: "0",
									right: "0",
									margin: "0.5rem",
									border: "none",
								}}
							>
								<CenterAlignedColumnContainer
									style={{
										background: "yellow",
										borderRadius: "50%",
										width: "24px",
										aspectRatio: "1/1",
									}}
									onClick={() => {
										console.log("clicked");
										handleUpdate({ persona });
									}}
								></CenterAlignedColumnContainer>
								<CenterAlignedColumnContainer
									style={{
										background: "pink",
										borderRadius: "50%",
										width: "24px",
										aspectRatio: "1/1",
									}}
									onClick={() => {
										console.log("clicked");
										handleRemove({ _id: persona._id });
									}}
								></CenterAlignedColumnContainer>
							</CenterAlignedRowContainer>
							<h3>{persona.name}</h3>
						</CenterAlignedColumnContainer>
					);
				}
			)}
		</WrappedFlexStartRowContainer>
	);
};

export default Personas;
