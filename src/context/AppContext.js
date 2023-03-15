import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const navigate = useNavigate();

	function storeToken(token) {
		sessionStorage.setItem("_token", `Token ${token}`);
	}
	function clearStorage() {
		sessionStorage.clear();
	}
	function isLoggedIn() {
		console.log("here");
		return sessionStorage.getItem("_token") !== null;
	}

	return (
		<AppContext.Provider
			value={{ isLoggedIn, navigate, storeToken, clearStorage }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
