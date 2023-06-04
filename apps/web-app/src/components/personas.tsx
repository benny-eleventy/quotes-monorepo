import { useGlobalState } from "state";
import {
	CenterAlignedColumnContainer,
	WrappedFlexStartRowContainer,
} from "@bennyui/core";
const Personas = () => {
	const {
		appData: { personas },
	} = useGlobalState();

	return (
		<WrappedFlexStartRowContainer
			style={{
				height: "auto",
			}}
		>
			{personas.map(
				(persona: { id: string; name: string; description: string }) => {
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
							key={persona.id}
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
