import "./loginPage.scss"
import "../../../shared/Button/button.scss"
import { NavLink, Outlet, Navigate} from 'react-router-dom';
import useAuthContext from '../../../hooks/authContext'

const LoginPage = (props) => {
    const { auth } = useAuthContext()

    if (auth) {
        return <Navigate to="/home" replace={true} />
    }

    return (
        <section className="wrapper">
            <header className="header">
                <span className="header__title">Skipper</span>
            </header>
            <div className="authentication">
                <div className="authentication__content form">
                    <div className="form__header">
                        <NavLink end to="/"  className={({ isActive }) => isActive ? "tab left active" : "tab left"}>ВХОД</NavLink>
                        <NavLink end to="/signup" className={({ isActive }) => isActive ? "tab right active" : "tab right"}>РЕГИСТРАЦИЯ</NavLink>
                    </div>
                    <div className="form__content">
                        <Outlet/>
                        <div className="form__footer">Входя в систему и регистрируясь, вы соглашаетесь с <a href="" className="policy">политикой безопасности</a> и <a href="" className="rules">правилами поведения</a> Skipper</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;