import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import Signin from "./Login/Signin";
import Signup from "./Login/Signup";
import { useState, useEffect } from 'react';

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
        
        <Router>
            <Routes>
                <Route path="/" element={logged ? <Navigate to="/home"/> : <LoginPage/>}>
                    <Route path="" element={<Signin/>} />
                    <Route path="signup" element={<Signup/>}/>
                </Route> 
                <Route path="/home" element={!logged ? <Navigate to="/"/> : <MainPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;