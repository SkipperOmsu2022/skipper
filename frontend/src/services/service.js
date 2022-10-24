import {useRequest} from "../hooks/useRequest"
import useAuthContext from '../hooks/useAuthContext'

const useService = () => {
    const {loading, setLoading, error, clearError, request} = useRequest();
    const { setAuth } = useAuthContext();

    const _apiBase = 'http://127.0.0.1:8080';

    const signup = async (data) => {
        const res = await request(`${_apiBase}/api/user/registration`, data);
    }

    const signin = async (data) => {
        const res = await request(`${_apiBase}/api/user/login`, data);
        if (res.status === 200) {
            localStorage.removeItem('logged');
            localStorage.setItem('logged', res.headers.location);
            setAuth(true);
        }
    }

    return {loading, request, error, clearError, setLoading, signup, signin}
}

export default useService;