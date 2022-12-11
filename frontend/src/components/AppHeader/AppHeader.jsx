import enviroments from "../../config/enviroments"

import messages from "../../resources/icons/messages.svg"
import bookmark from "../../resources/icons/bookmark.svg"
import notifications from "../../resources/icons/notifications.svg"
import search from "../../resources/icons/search.svg"
import photo from "../../resources/profile-photo.jpg"

import { Outlet, Navigate, Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useLayoutEffect } from "react"
import useAuthContext from "../../hooks/useAuthContext";
import useLoginService from "../../services/loginService"
import useProfileService from "../../services/profileService";
import "./appHeader.scss"

const AppHeader = () => {
    const {getUserData} = useProfileService();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUserResource, setImageUserResource] = useState("");
    
    const [navBarDisplay, setNavBarDisplay] = useState(false);
    const container = useRef();
    const { logout } = useLoginService()
    const { auth } = useAuthContext();

    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        getUserData('user/profile/')
            .then(res => {
                if(res) {
                    setFirstName(res?.data?.firstName)
                    setLastName(res?.data?.lastName)
                    setImageUserResource(res?.data?.imageUserResource)
                }
            })

        document.addEventListener("click", handleClickOutside);
        
        return () => document.removeEventListener("click",  handleClickOutside);
    }, []);

    const handleDropdownClick = () => setNavBarDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setNavBarDisplay(false);
        }
    };

    if (!auth) {
        return <Navigate to="authorization/signin" replace={true} />
    }

    const dropDown = `app-header__dropdown ${navBarDisplay ? '' : 'hide'}`;

    return (
        <>
            <header className="app-header">
                <div className="app-header__group">
                    <Link  to="/" className="app-header__logo">Skipper</Link>
                    <div className="app-header__icons">
                        <a href="messages">
                            <img src={messages} alt="messages" />
                        </a>
                        <a href="favorites">
                            <img src={bookmark} alt="favorites" className="bookmark"/>
                        </a>
                    </div>
                </div>
                <div className="app-header__group">
                    <div className="app-header__icons">
                        <a href="notifications">
                            <img src={notifications} alt="notifications" />
                        </a>
                        <a href="search">
                            <img src={search} alt="search" />
                        </a>
                    </div>
                    <div className="app-header__profile" ref={container} tabIndex={0} 
                        onClick={handleDropdownClick}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                setNavBarDisplay((dropdownDisplay) => !dropdownDisplay);
                            }
                        }}
                    >
                        <div className="app-header__profile-data">
                            <div className="app-header__profile-name">{firstName} {lastName}</div>
                        </div>
                        <img
                            className="app-header__profile-photo"
                            src={imageUserResource ? `${enviroments.apiBase}${imageUserResource}` : photo}
                            alt=""
                        />
                        <div className={dropDown} tabIndex="-1">
                            <div className="app-header__dropdown-item">
                                <NavLink end to="/"  className={({ isActive }) => `app-header__dropdown-text ${isActive ? ' active' : ''} `}>Главная страница</NavLink>
                            </div>
                            <div className="app-header__dropdown-item">
                                <NavLink to="/settings"  className={({ isActive }) => `app-header__dropdown-text ${isActive ? ' active' : ''} `}>Настройки профиля</NavLink>
                            </div>
                            <div className="app-header__dropdown-divider"></div>
                            <div className="app-header__dropdown-item">
                                <div className="app-header__dropdown-text exit"
                                    tabIndex={0}
                                    onClick={logout}
                                    onKeyPress={(e) => {
                                        if (e.key === ' ' || e.key === "Enter") {
                                            logout();
                                        }
                                    }}
                                >
                                    Выйти из аккаунта
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet/>
        </>
    )
}

export default AppHeader;