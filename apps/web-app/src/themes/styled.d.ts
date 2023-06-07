import { finalVariant } from "./theme-variant";
import "styled-components";

type ThemeInterface = typeof finalVariant;

declare module "styled-components" {
	export interface DefaultTheme extends ThemeInterface {}
}
