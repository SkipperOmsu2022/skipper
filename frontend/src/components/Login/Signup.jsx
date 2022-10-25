import Form from "../Form/Form";
import { Link } from 'react-router-dom';

import useService from "../../services/loginService";
import submitButton from "../../shared/submitButton/Button";

const Signup = () => {
    const {loading, signup, response, error, clearResponse} = useService();
    console.log(error);
    return (
        <>
            <Form
                inputs={[
                    {id:"lastName", name:"lastName", placeholder:"Фамилия", type:"text"},
                    {id:"firstName", name:"firstName", placeholder:"Имя", type:"text"},
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={signup}
                id="contact-form"
                clearResponse={clearResponse}
            />
            <div className={`form__response${error ? ' error' : ''}`}>{response}</div>
            <submitButton className="form__apply-button"
                    text="ЗАРЕГИСТРИРОВАТЬСЯ"
                    loading={loading}
                    form="contact-form"
                    type="submit"
            />
            <Link  to="/" className="registration">Уже есть аккаунт? Вход</Link>
        </>
    )
}

export default Signup;