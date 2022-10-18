import Form from "../Form/Form";
import { Link } from 'react-router-dom';
import { signIn } from "../../services/Service";

const Signin = () => {

    return (
        <>
            <Form
                inputs={[
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={signIn}
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