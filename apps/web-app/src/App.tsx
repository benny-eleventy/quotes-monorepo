import "./App.css";
import PersonaForm from "./components/persona-form";
import { ToastMessage } from "./components/toast-message";
import { useUiState } from "./state";

function App() {
	const { toastMessages } = useUiState();
	return (
		<>
			<PersonaForm />
			{toastMessages?.length > 0 && <ToastMessage />}
		</>
	);
}

export default App;
