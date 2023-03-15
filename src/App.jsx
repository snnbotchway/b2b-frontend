import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext.js";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

function App() {
	return (
		<Router>
			<AppProvider>
				<Routes>
					<Route path="/" element={<Login />} exact />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</AppProvider>
		</Router>
	);
}

export default App;
