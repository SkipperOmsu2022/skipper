import { NavLink, Outlet, Navigate} from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext'

import "./authorizationPage.scss"

const AuthorizationPage = (props) => {
    const { auth } = useAuthContext()

    if (auth) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <section className="login-wrapper">
            <header className="header">
                <span className="header__title">Skipper</span>
            </header>
            <div className="authentication">
                <div className="authentication__content form">
                    <div className="form__header">
                        <NavLink end to="./signin"  className={({ isActive }) => `tab left ${isActive? " active" : ""}`}>ВХОД</NavLink>
                        <NavLink end to="./signup" className={({ isActive }) => `tab right ${isActive? " active" : ""}`}>РЕГИСТРАЦИЯ</NavLink>
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