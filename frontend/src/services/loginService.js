import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"
import useAuthContext from '../hooks/useAuthContext'

const useLoginService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();
    const { setAuth } = useAuthContext();

    const _apiBase = enviroments.apiBase;

    const signup = async (data) => {
        const res = await request(`${_apiBase}/api/auth/registration`, 'post', data);
        
        if (res?.status === 201) {
            localStorage.removeItem('logged');
            localStorage.setItem('logged', res.headers.location);
            setAuth(true);
        } else if (res?.status === 400) {
            console.log(res?.message)
            setResponse("Такой пользователь уже существует");
        } else {
            setResponse("Что-то пошло не так");
        }
    }

    const signin = async (data) => {
        let form_data = new FormData();

        for ( var key in data ) {
            form_data.append(key, data[key]);
        }

        const res = await request(`${_apiBase}/api/auth/login`, 'post', form_data, {"Content-Type": 'multipart/form-data'});

        if (res?.status === 200) {
            localStorage.removeItem('logged');
            localStorage.setItem('logged', res.headers.location);
            setAuth(true);
        } else if (res?.status === 400 || res?.status === 404) {
            console.log(res?.message)
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

export default useLoginService;