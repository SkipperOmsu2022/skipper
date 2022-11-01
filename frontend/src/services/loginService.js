import {useRequest} from "../hooks/useRequest"
import useAuthContext from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";

const useService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();

    const _apiBase = 'http://127.0.0.1:8080';

    const signup = async (data) => {
        const res = await request(`${_apiBase}/api/user/registration`, data);
        
        if (res?.status === 201) {
            setResponse("Регистрация прошла успешно");
            navigate("../signin");
        } else if (res?.status === 400) {
            setResponse("Такой пользователь уже существует");
        } else {
            setResponse("Что-то пошло не так");
        }
    }

    const signin = async (data) => {
        const res = await request(`${_apiBase}/api/user/login`, data);
        
        if (res?.status === 200) {
            localStorage.removeItem('logged');
            localStorage.setItem('logged', res.headers.location);
            setAuth(true);
        } else if (res?.status === 400 || res?.status === 404) {
            setResponse("Неверный логин или пароль");
        } else {
            setResponse("Что-то пошло не так");
        }
    }

    const logout = () => {
        localStorage.removeItem('logged');
        setAuth(false);
    }

    return {request, loading, response, error, clearResponse, signup, signin, logout}
}

export default useService;