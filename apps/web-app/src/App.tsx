import "./App.css";
import PersonaForm from "./components/persona-form";
import { ToastMessage } from "./components/toast-message";
import { useUiState } from "./state";
import { useGetAll, usePersonas } from "hooks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setApiDetails } from "state";
function App() {
	const { toastMessages } = useUiState();

	const dispatch = useDispatch();

	useEffect(() => {
		const apiDetails = {
			baseURL: "https://antilibrary-uat.deno.dev",
			headers: {
				"Content-Type": "application/json",
				"X-App-Source": "QUOTES-WEB-APP",
			},
		};

		dispatch(setApiDetails(apiDetails));
	}, [dispatch]);

	useGetAll({
		entity: "personas",
	});

	useGetAll({
		entity: "quotes",
	});

	return (
		<>
			<PersonaForm />
			{toastMessages?.length > 0 && <ToastMessage />}
		</>
	);
}

export default App;
