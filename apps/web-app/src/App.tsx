import "./App.css";
import { PersonaForm } from "./components/persona-form";
import { ToastMessage } from "./components/toast-message";
import { useUiState } from "./state";
import { useGetAll } from "hooks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setApiDetails } from "state";
import Personas from "./components/personas";

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
			<Personas />
			<PersonaForm />
			{toastMessages?.length > 0 && <ToastMessage />}
		</>
	);
}

export default App;
