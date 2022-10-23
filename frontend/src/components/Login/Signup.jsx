import Form from "../Form/Form";
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext'
import useService from "../../services/service";

import Spinner from "../../shared/spinner/Spinner";

const Signup = () => {
    const {loading, error, testRequest} = useService();

    const signup = (values) => {
        console.log(JSON.stringify(values, null, 2))
    }

    return (
        <>
            <Form
                inputs={[
                    {id:"lastName", name:"lastName", placeholder:"Фамилия", type:"text"},
                    {id:"firstName", name:"firstName", placeholder:"Имя", type:"text"},
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={testRequest}
            />
            <button form="contact-form"
                    type="submit"
                    className="form__apply-button button"
                    style={loading ? {'display': 'none'} : null}>
                    РЕГИСТРАЦИЯ
            </button>
            {loading ? <Spinner/> : null}
            <Link  to="/" className="registration">Уже есть аккаунт? Вход</Link>
        </>
    )
}

export default Signup;