import { Router } from "next/router";
import React, { useState, useEffect } from "react";
import createPersistedState from "use-persisted-state";
import { useRouter } from 'next/router';
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
import api from "./adapter";
const useTokenState = createPersistedState("token");
const useUserState = createPersistedState("userData");
const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [userData, setUserData] = useUserState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [flag,setFlag]=useState(false);

	const logout = () => {
		setToken("");
		setUserData({user:{role:""}});
		router.push('/login');
		setIsAuthenticated(false);
	};

	const login = async () => {
		const response = await api.get("/auth/user_data");
		let user= response.data.auth_obj;
		setUserData(user);
		setIsAuthenticated(true);
		console.log(userData)
		return "Login Successfull";
	};

	useEffect(() => {
		if(setIsAuthenticated!=true){
			router.push('/login');
		}
	}, [setIsAuthenticated]);

	const value = {
		user: {
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
