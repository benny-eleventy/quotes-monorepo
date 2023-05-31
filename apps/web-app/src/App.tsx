import StyledDiv from "components";
import { useQuotes, usePersonas } from "hooks";
import "./App.css";

function App() {
	const { data } = useQuotes();
	const { data: personas } = usePersonas();

	console.log(personas);
	console.log(data);

	return (
		<>
			<StyledDiv>Hello</StyledDiv>
		</>
	);
}

export default App;
