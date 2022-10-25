import {useRequest} from "../hooks/useRequest"
import useAuthContext from '../hooks/useAuthContext'

const useService = () => {
    const {request, loading, response, setResponse, error, setError} = useRequest();
    const { setAuth } = useAuthContext();

    const _apiBase = 'http://sdfgdf';

    const clearResponse = () => {
        setResponse(null);
        setError(false);
    }

    const signup = async (data) => {
        const res = await request(`${_apiBase}/api/user/registration`, data);
        
        if (res?.status === 201) {
            setResponse("Регистрация прошла успешно");
        } else if (res?.status === 400) {
            setResponse("Такой пользователь уже существует");
        } else {
            setResponse("Что-то пошло не так");
        }
    }

    const signin = async (data) => {
        const res = await request(`${_apiBase}/api/user/login`, data);
        console.log(res);
        if (res?.status === 200) {
            localStorage.removeItem('logged');
            localStorage.setItem('logged', res.headers.location);
            setAuth(true);
        } else if (res?.status === 500) {
            setResponse("Пользователь не найден!");
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