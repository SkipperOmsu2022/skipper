import Form from "../Form/Form";
import { Link } from 'react-router-dom';

import Spinner from "../../shared/spinner/Spinner";
import useService from "../../services/service";

const Signin = () => {
    const {loading, signin} = useService();

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