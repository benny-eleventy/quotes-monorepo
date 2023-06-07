import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./state";
import { ThemeWrapper } from "./themes/theme-wrapper";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
		},
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ThemeWrapper>
						<App />
					</ThemeWrapper>
				</QueryClientProvider>
			</Provider>
		</>
	</React.StrictMode>
);
