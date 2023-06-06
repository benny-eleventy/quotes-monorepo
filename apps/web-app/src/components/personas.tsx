import {
	getNextPage,
	loadFormData,
	PersonaFields,
	usePersonaGlobalState,
} from "state";
import {
	CenterAlignedColumnContainer,
	CenterAlignedRowContainer,
	FlexStartColumnContainer,
	s,
	Text,
	WrappedFlexStartRowContainer,
} from "@bennyui/core";
import { useDeleteOne, useUpdateOne } from "hooks";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { addToastMessage } from "../state";
import React from "react";
const Personas = () => {
	const { results, pagination, status } = usePersonaGlobalState();

	const { currentPage, to, totalPages, totalCount } = pagination;
	const { isLoading } = status;

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

	const handleRemove = ({ _id }: { _id?: string }) => {
		if (!_id) {
			return;
		}
		deleteOne({ entity: "persona", _id });
	};

	const handleUpdate = ({ persona }: { persona: PersonaFields }) => {
		dispatch(
			loadFormData({
				entity: "persona",
				data: persona,
			})
		);
	};

	return (
		<FlexStartColumnContainer width="100%" height="80vh">
			<h2>Personas</h2>
			{results.length > 0 && (
				<h3>
					1 - {to} of {totalCount} results
				</h3>
			)}
			<WrappedFlexStartRowContainer
				style={{
					width: "100%",
					height: "auto",
				}}
			>
				{results?.map((persona: PersonaFields) => {
					return (
						<>
							<PersonaCard
								persona={persona}
								handleRemove={handleRemove}
								handleUpdate={handleUpdate}
							/>
						</>
					);
				})}
			</WrappedFlexStartRowContainer>
			{currentPage < totalPages ? (
				<s.Button
					width="240px"
					height="auto"
					padding="0.5rem 0.2rem"
					background="lightyellow"
					color="black"
					onClick={() => {
						console.log("clicked");
						dispatch(
							getNextPage({
								entity: "personas",
								page: Number(currentPage) + 1,
							})
						);
					}}
				>
					{isLoading ? "Loading..." : "Load more"}
				</s.Button>
			) : (
				<>{!isLoading && <Text>End of results</Text>}</>
			)}
		</FlexStartColumnContainer>
	);
};

export default Personas;

const PersonaCard = ({
	persona,
	handleRemove,
	handleUpdate,
}: {
	persona: PersonaFields;
	handleRemove: ({ _id }: { _id?: string }) => void;
	handleUpdate: ({ persona }: { persona: PersonaFields }) => void;
}) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const [name, setName] = React.useState("");
	const queryClient = useQueryClient();

	const onUpdateSuccess = (_data: any) => {
		queryClient.invalidateQueries({ queryKey: ["personas", 1] });
		setIsEditing(false);
	};

	const onUpdateError = (_error: any) => {
		setIsEditing(true);
	};

	const { updateOne } = useUpdateOne({
		onUpdateSuccess,
		onUpdateError,
	});

	const handleUpdateField = ({ persona }: { persona: PersonaFields }) => {
		if (!persona._id) {
			return;
		}

		updateOne({
			entity: "persona",
			body: { name },
			_id: persona._id && persona._id,
		});
	};

	return (
		<>
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
				{isEditing ? (
					<input
						type="text"
						value={name}
						onChange={(e) => {
							console.log(e.target.value);
							setName(e.target.value);
						}}
						onBlur={() => {
							console.log("blur");
							// setIsEditing(false);
							handleUpdateField({ persona });
						}}
					/>
				) : (
					<h3
						onClick={() => {
							setIsEditing(true);
							setName(persona.name);
						}}
					>
						{persona.name}
					</h3>
				)}
			</CenterAlignedColumnContainer>
		</>
	);
};
