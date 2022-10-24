import Form from "../Form/Form";
import { Link } from 'react-router-dom';

import useService from "../../services/loginService";
import Button from "../../shared/button/Button";

const Signin = () => {
    const {loading, signin, response, error, clearResponse} = useService();
    console.log(loading);
    return (
        <>
            <Form
                inputs={[
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={signin}
                id="contact-form"
                clearResponse={clearResponse}
            />
            <div className={`form__response${error ? ' error' : ''}`}>{response}</div>
            <a  href="адрес" className="forgot-password">Забыли пароль?</a>
            <Button text="ВОЙТИ"
                    loading={loading}
                    form="contact-form"
                    type="submit"
                    className="form__apply-button button"
            />
            <Link  to="/signup" className="registration">Ещё нет аккаунта? Регистрация</Link>
        </>
    )
}

export default Signin;