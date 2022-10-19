import Form from "../Form/Form";
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/authContext'


const Signup = () => {
    const { signup } = useAuthContext()

    return (
        <>
            <Form
                inputs={[
                    {id:"lastName", name:"lastName", placeholder:"Фамилия", type:"text"},
                    {id:"firstName", name:"firstName", placeholder:"Имя", type:"text"},
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={signup}
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