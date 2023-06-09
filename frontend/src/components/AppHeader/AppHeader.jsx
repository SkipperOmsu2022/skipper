import enviroments from "../../config/enviroments"

import messages from "../../resources/icons/messages.svg"
import bookmark from "../../resources/icons/bookmark.svg"
import notifications from "../../resources/icons/notifications.svg"
import search from "../../resources/icons/search.svg"
import photo from "../../resources/profile-photo.jpg"

import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useLayoutEffect } from "react"
import useAuthContext from "../../hooks/useAuthContext";
import useLoginService from "../../services/loginService"
import useProfileService from "../../services/profileService";
import useMessageService from "../../services/messageService"
import { api } from "../../services/api"

import { observer } from "mobx-react-lite";
import messagesStore from "../../store/messagesStore";

import "./appHeader.scss"
import "../../shared/user-photo.scss"

const AppHeader = () => {
    const { auth } = useAuthContext();
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <header className="app-header">
                <div className="app-header__group">
                    <Link  to="/mentors" className="app-header__logo">Skipper</Link>
                    { 
                        auth ?
                        <div className="app-header__icons">
                            <NavLink to="/messages"><img src={messages} alt="messages" /></NavLink>
                            <NavLink to="/favorites"><img src={bookmark} alt="favorites" className="bookmark-icon"/></NavLink>
                        </div> : null
                    }
                </div>
                { auth ? <LoggedDisplay/> : <UnloggedDisplay/>}
            </header>
            <Outlet/>
        </>
    )
}

const LoggedDisplay = observer(() => {
    const {getUserData} = useProfileService();
    const { getMessagesList } = useMessageService();
    const { auth: userId } = useAuthContext();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUserResource, setImageUserResource] = useState("");
    
    const [navBarDisplay, setNavBarDisplay] = useState(false);
    const container = useRef();

    const { logout } = useLoginService()
    const location = useLocation();
    
    useEffect(() => {
        getUserData(api.userProfile, userId)
            .then(res => {
                if(res) {
                    setFirstName(res?.data?.firstName)
                    setLastName(res?.data?.lastName)
                    setImageUserResource(res?.data?.imageUserResource)
                    messagesStore.setUser(res, userId)
                }
            })
            .then(res => {
                messagesStore?.setLoading(true);
                return getMessagesList()
            })
            .then(res => {
                messagesStore.setInitialInterlocutors(res)
                messagesStore?.setLoading(false);
            })
            .then(res => {
                messagesStore.setStompClient();
            })
            .then(() => {
                if (location?.state?.activeDialog) {
                    messagesStore.openUserDialog(location?.state?.activeDialog)
                }
            })


        document.addEventListener("click", handleClickOutside);
        
        return () => {
            messagesStore.disconnect();
            messagesStore.clearStore()
            document.removeEventListener("click",  handleClickOutside);
        }
    }, []);

    const handleDropdownClick = () => setNavBarDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setNavBarDisplay(false);
        }
    };

    const dropDown = `app-header__dropdown ${navBarDisplay ? '' : 'hide'}`;

    return (
        <div className="app-header__group">
            <div className="app-header__icons">
                <div href="notifications" className="hover">
                    <img src={notifications} alt="notifications" />
                </div>
                <div href="search" className="hover">
                    <img src={search} alt="search" />
                </div>
            </div>
            <div 
                className="app-header__profile" ref={container} tabIndex={0} 
                onClick={handleDropdownClick}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        setNavBarDisplay((dropdownDisplay) => !dropdownDisplay);
                    }
                }}
            >
                <div className="app-header__profile-data">
                    <div className="app-header__profile-name">{firstName} {lastName}</div>
                </div>
                <img
                    className="app-header__profile-photo user-photo"
                    src={imageUserResource ? `${enviroments.apiBase}${imageUserResource}` : photo}
                    alt="user"
                />
                <div className={dropDown} tabIndex="-1">
                    <div className="app-header__dropdown-item">
                        <NavLink
                            end
                            to="/mentors" 
                            className={({ isActive }) => `app-header__dropdown-text ${isActive ? ' active' : ''} `}
                        >
                            Главная страница
                        </NavLink>
                    </div>
                    <div className="app-header__dropdown-item">
                        <NavLink
                            to={`/profile/${userId}`} 
                            className={({ isActive }) => `app-header__dropdown-text ${isActive ? ' active' : ''} `}
                        >
                            Мой профиль
                        </NavLink>
                    </div>
                    <div className="app-header__dropdown-item">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => `app-header__dropdown-text ${isActive ? ' active' : ''} `}
                        >
                            Настройки профиля
                        </NavLink>
                    </div>
                    <div className="app-header__dropdown-divider"></div>
                    <div className="app-header__dropdown-item">
                        <Link
                            to={'/'}
                            className="app-header__dropdown-text exit"
                            tabIndex={0}
                            onClick={logout}
                            onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {
                                    logout();
                                }
                            }}
                        >
                            Выйти из аккаунта
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
})

const UnloggedDisplay = () => {
    return (
        <div className="app-header__group">
            <Link to={"/authorization"} className="button white">Войти</Link>
            <Link to={"/authorization/signup"} className="button">Зарегистрироваться</Link>
        </div>
    )
}

export default AppHeader;