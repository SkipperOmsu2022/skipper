import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './Auth/AuthProvider';

import AuthorizationPage from "./pages/LoginPage/LoginPage";
import Signin from "./Login/Signin";
import Signup from "./Login/Signup";

import MainPage from "./pages/MainPage/MainPage";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/authorization" element={<AuthorizationPage/>}>
                        <Route path="signin" element={<Signin/>} />
                        <Route path="signup" element={<Signup/>}/>
                    </Route> 
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;