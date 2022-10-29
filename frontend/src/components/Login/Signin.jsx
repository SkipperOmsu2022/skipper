import Form from "../Form/Form";
import { Link } from 'react-router-dom';

import useService from "../../services/loginService";
import Button from "../../shared/submitButton/Button";

const Signin = () => {
    const {loading, signin, response, error, clearResponse} = useService();
    
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
            <Button className="form__apply-button"
                    text="ВОЙТИ"
                    loading={loading}
                    form="contact-form"
                    type="submit"
            />
            <Link  to="../signup" className="registration">Ещё нет аккаунта? Регистрация</Link>
        </>
    )
}

export default Signin;