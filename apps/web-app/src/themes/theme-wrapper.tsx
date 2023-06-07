import { ThemeProvider } from "styled-components";
import { colors } from "@bennyui/core";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
	const finalTheme = colors[0];
	return <ThemeProvider theme={finalTheme}>{children}</ThemeProvider>;
};

export { ThemeWrapper };
