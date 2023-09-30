import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Cover from "./scenes/welcome/Cover";
import ParticlesBackground from "./scenes/global/ParticlesBackground";
import { LayoutGroup, motion } from "framer-motion";


function App() {
	const [theme, colorMode] = useMode();

    const staggeredOpening = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { staggerChildren: 5, delayChildren: 5 }
    };

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LayoutGroup
					variants={staggeredOpening}
					initial="initial"
					animate="animate"
					exit="exit"
					transition="transition"
				>
					<ParticlesBackground />
					<div className="app">
						<div className="content">
							<Topbar />
							<Cover />
						</div>
					</div>
				</LayoutGroup>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
