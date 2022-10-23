import Form from "../Form/Form";
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext'

import Spinner from "../../shared/spinner/Spinner";
import useService from "../../services/service";

const Signin = () => {
    const { setAuth } = useAuthContext()
    const {loading, error, testRequest} = useService();
    const signin = (values) => {
        console.log(JSON.stringify(values, null, 2))
        localStorage.removeItem('logged');
        localStorage.setItem('logged', true);
        setAuth(true)
    }

    return (
        <>
            <Form
                inputs={[
                    {id:"email", name:"email", placeholder:"Email", type:"text"},
                    {id:"password", name:"password", placeholder:"Пароль", type:"password"}]}
                submit={testRequest}
            />
            <a  href="" className="forgot-password">Забыли пароль?</a>
            <button form="contact-form"
                    type="submit"
                    className="form__apply-button button"
                    style={loading ? {'display': 'none'} : null}>
                    ВОЙТИ
            </button>
            {loading ? <Spinner/> : null}
            <Link  to="/signup" className="registration">Ещё нет аккаунта? Регистрация</Link>
        </>
    )
}

export default Signin;