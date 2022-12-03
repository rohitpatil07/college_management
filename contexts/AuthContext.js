import React,{  useState , useEffect }  from 'react';
import createPersistedState from 'use-persisted-state';
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
import api from './adapter';
const useTokenState = createPersistedState("");
const AuthContext = React.createContext({});

const AuthProvider = ({children}) => {

    const [token, setToken] = useTokenState("");
    const [userData,setUserData] = useState({});
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    const logout = () => {
        setToken("");
        setIsAuthenticated(false);
    }
    
    const login = async (data) => {
        const response = await api.post("/auth/login",data);
        const {token , ...user} = response.data;
        setToken(token);
        console.log(user);
        setUserData(user);

        setIsAuthenticated(true);
        return response;
    }

    useEffect(() => {
        if(token) {
            setIsAuthenticated(true);
        }
    }, [token])


    const value = {
        user:{
            token : token,
            isAuthenticated : isAuthenticated,
            userData: userData
        },
        login,
        logout,
    }
    


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};





export default AuthProvider;
export {useAuth};