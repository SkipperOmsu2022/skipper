import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(localStorage.getItem('logged'))

    const signin = (values) => {
        console.log(JSON.stringify(values, null, 2))
        localStorage.removeItem('logged');
        localStorage.setItem('logged', true);
        setAuth(true)
    }

    const signup = (values) => {
        console.log(JSON.stringify(values, null, 2))
    }

    const logout = () => {
        localStorage.removeItem('logged');
        setAuth(false)
    }

    const value = {auth, signin, signup, logout}

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}