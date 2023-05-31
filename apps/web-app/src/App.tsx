import { StyledDiv } from "components";
import { useQuotes, usePersonas } from "hooks";
import "./App.css";

function App() {
	const { data } = useQuotes();
	const { data: personas } = usePersonas();

	return (
		<>
			<StyledDiv>Hello</StyledDiv>
		</>
	);
}

export default App;
