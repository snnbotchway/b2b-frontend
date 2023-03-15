import * as React from "react";
import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "../components/Copyright";
import Header from "../components/Header";

<Copyright />;

const theme = createTheme();

export default function Dashboard() {
	const { isLoggedIn, navigate } = useContext(AppContext);

	useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/login");
		}
	}, [isLoggedIn, navigate]);

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Box>Dashboard</Box>
		</ThemeProvider>
	);
}
