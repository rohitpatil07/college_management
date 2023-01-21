import React, { useState, useEffect } from "react";
import createPersistedState from "use-persisted-state";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
import api from "./adapter";
const useTokenState = createPersistedState("token");
const useUserState = createPersistedState("userData");
const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useTokenState("token");
	const [userData, setUserData] = useUserState({});
	// const [role, setRole] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const logout = () => {
		setToken("");
		setIsAuthenticated(false);
	};

	const login = async (data) => {
		const response = await api.post("/auth/login", data);
		let { token, ...user } = response.data;

		// console.log(user.roll_no);
		// console.log(user.user.roll_no);

		// setRole(user.user.role);
		api.defaults.headers.Authorization = `Bearer ${token}`;
		setToken(token);
		setUserData(user);

		setIsAuthenticated(true);
		return response;
	};

	useEffect(() => {
		if (token) {
			setIsAuthenticated(true);
		}
		else {
			setIsAuthenticated(false);
		}
	}, [token]);

	const value = {
		user: {
			token: token,
			isAuthenticated: isAuthenticated,
			userData: userData,
			// role,
		},
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export default AuthProvider;
export { useAuth };
