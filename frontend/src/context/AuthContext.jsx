import { useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(localStorage.getItem("role"));

    const login = (token, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.clear();
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value = {{userRole, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};