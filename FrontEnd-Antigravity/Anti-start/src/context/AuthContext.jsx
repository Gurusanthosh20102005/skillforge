import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("skillforge_user");
        const storedToken = localStorage.getItem("skillforge_token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("skillforge_token", userData.token);
        localStorage.setItem("skillforge_user", JSON.stringify(userData));
        localStorage.setItem("skillforge_role", userData.role);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("skillforge_token");
        localStorage.removeItem("skillforge_user");
        localStorage.removeItem("skillforge_role");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
