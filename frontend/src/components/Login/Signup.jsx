import Form from "../Form/Form";
import { Link } from 'react-router-dom';
import { signUp } from "../../services/Service";


const Signup = () => {

    return (
        <>
            <Form
                inputs={[
                    {id:"surname", name:"surname", placeholder:"Фамилия", type:"text"},
                    {id:"name", name:"name", placeholder:"Имя", type:"text"},
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={signUp}
            />
            <button form="contact-form"
                    type="submit"
                    className="form__apply-button button">
                    РЕГИСТРАЦИЯ
            </button>
            <Link  to="/" className="registration">Уже есть аккаунт? Вход</Link>
        </>
    )
}

export default Signup;