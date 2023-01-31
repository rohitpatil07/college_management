import { Router } from "next/router";
import React, { useState, useEffect } from "react";
import createPersistedState from "use-persisted-state";
import { useRouter } from 'next/navigation';
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
import api from "./adapter";
const useTokenState = createPersistedState("token");
const useUserState = createPersistedState("userData");
const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [token, setToken] = useTokenState("token");
	const [userData, setUserData] = useUserState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const logout = () => {
		setToken("");
		setUserData({user:{role:""}});
		router.push('/login');
		setIsAuthenticated(false);
	};

	const login = async (data) => {
		const response = await api.post("/auth/login", data);
		let { token, ...user } = response.data;
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
			router.push('/login');
		}
	}, [token]);

	const value = {
		user: {
			token: token,
			isAuthenticated: isAuthenticated,
			userData: userData,
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
