import Form from "../Form/Form";
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/authContext'

const Signin = () => {
    const { signin } = useAuthContext()

    return (
        <>
            <Form
                inputs={[
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={signin}
            />
            <a  href="" className="forgot-password">Забыли пароль?</a>
            <button form="contact-form"
                    type="submit"
                    className="form__apply-button button">
                    ВОЙТИ
            </button>
            <Link  to="/signup" className="registration">Ещё нет аккаунта? Регистрация</Link>
        </>
    )
}

export default Signin;