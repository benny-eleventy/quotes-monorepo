import { useDispatch } from "react-redux";
import { removeToastMessage, useUiState } from "../state";

export const ToastMessage = () => {
	const dispatch = useDispatch();
	const { toastMessages } = useUiState();
	const handleDismiss = (id: string) => {
		dispatch(removeToastMessage(id));
	};

	return (
		<div
			style={{
				position: "fixed",
				top: "10%",
				right: 0,
				background: "lightpink",
				color: "black",
				padding: "1rem",
			}}
		>
			{toastMessages.map((toast) => (
				<div key={toast.id}>
					<p>{toast.message}</p>
					<button onClick={() => handleDismiss(toast.id)}>Dismiss</button>
				</div>
			))}
		</div>
	);
};
