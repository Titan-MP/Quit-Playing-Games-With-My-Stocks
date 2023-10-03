import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ParticlesBackground from "./scenes/global/ParticlesBackground";
import Topbar from "./scenes/global/Topbar";
import WelcomePage from "./scenes/welcome/WelcomePage";
import { LayoutGroup } from "framer-motion";
import Dashboard from "./scenes/dashboard/Dashboard";

//Import Appllo Client
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./scenes/dashboard/Dashboard";

const httpLink = createHttpLink({
	uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
	  headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : '',
	  },
	};
  });
  
  const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
  });


function App() {
	const [theme, colorMode] = useMode();

    const staggeredOpening = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { staggerChildren: 5, delayChildren: 5 }
    };

	return (
		<ApolloProvider client={client}>
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
							{/* <Topbar />
							<WelcomePage /> */}
							<Router>
								<Routes>
									<Route
										path="/"
										element={[<Topbar/>,<WelcomePage/>]}
									/>
									<Route
										path="/dashboard"
										element={<Dashboard/>}
									/>
								</Routes>
							</Router>
						</div>
					</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
		</ApolloProvider>
	);
}

export default App;
