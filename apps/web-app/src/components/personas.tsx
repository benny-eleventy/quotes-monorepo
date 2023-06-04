import { useGlobalState } from "state";
import {
	CenterAlignedColumnContainer,
	WrappedFlexStartRowContainer,
} from "@bennyui/core";
import { useDeleteOne } from "hooks";
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

	return (
		<WrappedFlexStartRowContainer
			style={{
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
								width: "200px",
								color: "black",
							}}
							key={persona._id}
							onClick={() => {
								console.log("clicked");
								handleRemove({ _id: persona._id });
							}}
						>
							<h3>{persona.name}</h3>
						</CenterAlignedColumnContainer>
					);
				}
			)}
		</WrappedFlexStartRowContainer>
	);
};

export default Personas;
