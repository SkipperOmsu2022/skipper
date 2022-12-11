import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from '../Auth/AuthProvider';

import AuthorizationPage from "../pages/AuthorizationPage/AuthorizationPage";
import Signin from "../Authorization/Signin";
import Signup from "../Authorization/Signup";

import AppHeader from '../AppHeader/AppHeader';
import MainPage from "../pages/MainPage/MainPage";
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import MentorProfilePage from '../pages/MentorProfilePage/MentorProfilePage';
import Common from '../Settings/Common';
import Account from '../Settings/Account';
import Communication from '../Settings/Communication';
import Mentor from '../Settings/Mentor';

import "./app.scss"
import { MessagesPage } from '../pages/MessagesPage/MessagesPage';

const App = () => {
    return (
        <div className='section'>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/authorization" element={<AuthorizationPage/>}>
                            <Route path="signin" element={<Signin/>} />
                            <Route path="signup" element={<Signup/>}/>
                        </Route>
                        <Route path="/" element={<AppHeader/>}>
                            <Route path="messages" element={<MessagesPage />} />
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
        </div>
    )
}

export default App;