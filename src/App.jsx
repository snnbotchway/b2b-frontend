import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext.js";
import Login from "./screens/Login";

function App() {
	return (
		<Router>
			<AppProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</AppProvider>
		</Router>
	);
}

export default App;
