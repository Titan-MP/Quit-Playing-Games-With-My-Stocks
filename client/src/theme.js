import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import "@fontsource/lato";

export const themeSettings = (mode) => {
	const fontFamily = ["Lato", "sans-serif"].join(",");

	return {
		palette: {
			mode: mode
		},
		typography: {
			fontFamily: fontFamily,
			fontSize: 12,
			h1: {
				fontFamily: fontFamily,
				fontSize: 96
			},
			h2: {
				fontFamily: fontFamily,
				fontSize: 72
			},
			h3: {
				fontFamily: fontFamily,
				fontSize: 48
			},
			h4: {
				fontFamily: fontFamily,
				fontSize: 36
			},
			h5: {
				fontFamily: fontFamily,
				fontSize: 28
			},
			h6: {
				fontFamily: fontFamily,
				fontSize: 24
			},
			subtitle1: {
				fontFamily: fontFamily,
				fontSize: 20
			},
			subtitle2: {
				fontFamily: fontFamily,
				fontSize: 18
			},
			body1: {
				fontFamily: fontFamily,
				fontSize: 16
			},
			body2: {
				fontFamily: fontFamily,
				fontSize: 14
			}
		}
	};
};

export const ColorModeContext = createContext({
	toggleColorMode: () => {}
});

export const useMode = () => {
	const [mode, setMode] = useState("dark");

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === "light" ? "dark" : "light"
				);
			}
		}),
		[]
	);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return [theme, colorMode];
};
