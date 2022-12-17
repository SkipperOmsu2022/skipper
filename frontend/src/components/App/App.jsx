import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from '../Auth/AuthProvider';

import AuthorizationPage from "../pages/AuthorizationPage/AuthorizationPage";
import Signin from '../pages/AuthorizationPage/Signin';
import Signup from '../pages/AuthorizationPage/Signup';

import AppHeader from '../AppHeader/AppHeader';
import MainPage from "../pages/MainPage/MainPage";
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import MentorProfilePage from '../pages/MentorProfilePage/MentorProfilePage';
import Common from '../pages/SettingsPage/Common';
import Account from '../pages/SettingsPage/Account';
import Communication from '../pages/SettingsPage/Communication';
import Mentor from '../pages/SettingsPage/Mentor';

import "./app.scss"

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/authorization" element={<AuthorizationPage/>}>
                        <Route path="signin" element={<Signin/>} />
                        <Route path="signup" element={<Signup/>}/>
                    </Route>
                    <Route path="/" element={<AppHeader/>}>
                        <Route path="settings" element={<SettingsPage/>}>
                            <Route path="" element={<Common/>}/>
                            <Route path="account" element={<Account/>}/>
                            <Route path="communication" element={<Communication/>}/>
                            <Route path="mentor" element={<Mentor/>}/>
                        </Route>
                        <Route path="profile/:userId" element={<ProfilePage/>}/>
                        <Route path="profile-mentor/:userId" element={<MentorProfilePage/>}/>
                        <Route path="" element={<MainPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;