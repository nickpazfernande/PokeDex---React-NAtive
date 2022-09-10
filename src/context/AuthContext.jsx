import React, {useState, createContext} from "react";

//Creamos el contexto, con la informacion que va a manejar.
export const AuthContext = createContext({
    user: undefined,
    login: () => {},
    logout: () => {}
})

//Create provider
export function AuthProvider(props){
    //El children seria toda nuestra aplicacion.
    const { children } = props;
    //Datos del usuario
    const [auth, setAuth] = useState(undefined)

    //Guardar datos del usuario logueado.
    const login = (userData) => {
        setAuth(userData)
    }

    //Funcion que elimina la informacion del contexto
    const logout = () => {
        setAuth(undefined)
    }

    //Variables y funciones que vamos a disponibilizar.
    const valueContext = {
        auth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}