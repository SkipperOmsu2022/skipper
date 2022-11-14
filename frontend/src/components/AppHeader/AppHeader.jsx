import messages from "../../resources/icons/messages.svg"
import favorites from "../../resources/icons/favorites.svg"
import notifications from "../../resources/icons/notifications.svg"
import search from "../../resources/icons/search.svg"
import photo from "../../resources/profile-photo.jpg"

import { Outlet, Navigate, Link, NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from "react"
import useAuthContext from "../../hooks/useAuthContext";
import useService from "../../services/loginService"
import "./appHeader.scss"

const AppHeader = () => {
    const [navBarDisplay, setNavBarDisplay] = useState(false);
    const container = useRef();
    const { logout } = useService()
    const { auth } = useAuthContext();

    useEffect(() => {
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
                            <img src={favorites} alt="favorites" />
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
                            <div className="app-header__profile-name">Имя Фамилия</div>
                        </div>
                        <img className="app-header__profile-photo" src={photo} alt="" />

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
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default AppHeader;