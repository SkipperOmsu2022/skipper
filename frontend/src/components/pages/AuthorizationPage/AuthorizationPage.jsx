import { NavLink, Outlet, Navigate, Link} from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext'

import "./authorizationPage.scss"

const AuthorizationPage = () => {
    const { auth } = useAuthContext()

    if (auth) {
        return <Navigate to="/mentors" replace={true} />
    }

    return (
        <section className="login-wrapper">
            <header className="header">
                <Link
                    className="header__title"
                    to={`/mentors`}
                >
                    Skipper
                </Link>
            </header>
            <div className="authentication">
                <div className="authentication__content form">
                    <div className="form__header">
                        <NavLink
                            className={({ isActive }) => `tab left ${isActive? " active" : ""}`}
                            to="/authorization"
                            end
                        >
                            ВХОД
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => `tab right ${isActive? " active" : ""}`}
                            to="/authorization/signup"
                            end
                        >
                            РЕГИСТРАЦИЯ
                        </NavLink>
                    </div>
                    <div className="form__content">
                        <Outlet/>
                        <div className="form__footer">Входя в систему и регистрируясь, вы соглашаетесь с <a href="адрес" className="policy">политикой безопасности</a> и <a href="адрес" className="rules">правилами поведения</a> Skipper</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthorizationPage;