import {useRequest} from "../hooks/useRequest"
import useAuthContext from '../hooks/useAuthContext'

const useSettingsService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();
    const { setAuth } = useAuthContext();

    const _apiBase = 'http://127.0.0.1:8080';
    const userId = 22;//localStorage.getItem('logged');

    /* const getAccountData = async () => {
        const userId = 22;//localStorage.getItem('logged');
        const res = await request(`${_apiBase}/api/user/${userId}`);
        
        console.log(res);
    } */

    const setAccountData = async (data) => {
        const res = await request(`${_apiBase}/api/user/account/${userId}`, data);
        setResponse('Изменения сохранены')
        console.log(res);
    }

    return {request, loading, response, error, clearResponse, setAccountData}
}

export default useSettingsService;