import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // NÃO está guardando os tokens no localstorage, esta guardando apenas se o usuário confia ou não.
    const [persistente, setPersistente] = useState(JSON.parse(localStorage.getItem("persistente")) || false );

    return (
        <AuthContext.Provider value={{ auth, setAuth, persistente, setPersistente }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;