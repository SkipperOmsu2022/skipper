import {useRequest} from "../hooks/useRequest"
import useAuthContext from '../hooks/useAuthContext'

const useProfileService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = 'http://127.0.0.1:8080';
    const userId = 60;//localStorage.getItem('logged');

    /* const getAccountData = async () => {
        const userId = 22;//localStorage.getItem('logged');
        const res = await request(`${_apiBase}/api/user/${userId}`);
        
        console.log(res);
    } */

    const getUserData = async (url) => {
        const res = await request(`${_apiBase}/api/user/${url}${userId}`, 'get');
        console.log(res);
        return res;
    }
    
    const setUserData = async (data, url) => {
        console.log(data);
        const res = await request(`${_apiBase}/api/user/${url}${userId}`, 'put', data);
        console.log(res);
        if (res?.status === 200) {
            setResponse("Изменения сохранены");
        } else {
            setResponse("Что-то пошло не так");
        }
        return res;
    }

    return {request, loading, response, error, clearResponse, getUserData, setUserData}
}

export default useProfileService;