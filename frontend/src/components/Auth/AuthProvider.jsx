import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(localStorage.getItem('logged'))

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}