import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AuthProvider } from './Auth/AuthProvider';

import LoginPage from "./pages/LoginPage/LoginPage";
import Signin from "./Login/Signin";
import Signup from "./Login/Signup";

import MainPage from "./pages/MainPage/MainPage";

const App = () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('logged')) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    });

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage/>}>
                        <Route path="" element={<Signin/>} />
                        <Route path="signup" element={<Signup/>}/>
                    </Route> 
                    <Route path="/home" element={<MainPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;