import React,{ Context , useContext , useEffect , useState }  from 'react';
import axios from 'axios';

const AuthContext = React.createContext({});

const AuthProvider = ({children} : any) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");
    const [isAuthenticated,setIsAuthenticated] = useState(false);


    // const logout = () => {
    //     setToken("");
    //     setIsAuthenticated(false);
    // }

    // const login = async (data: any) => {
    //     const response = await axios.post("http://localhost:5000/auth/login",data);
    //     const {token } = data;
    //     setToken(token);
    //     setIsAuthenticated(true);
    //     return response;
    // }

    // useEffect(() => {
    //     // api.defaults.headers.Authorization = `Bearer ${token}`;
    //     if(token) {
    //         setIsAuthenticated(true);
    //     }
    // }, [token])


    const value = {
        userToken : token,
        isAuthenticated : isAuthenticated,
        setToken,
        setIsAuthenticated
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