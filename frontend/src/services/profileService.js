import {useRequest} from "../hooks/useRequest"

const useProfileService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = 'http://127.0.0.1:8080';
    const userId = localStorage.getItem('logged');

    const getUserData = async (url, id) => {
        const res = await request(`${_apiBase}/api/${url}${id || userId}`, 'get');

        console.log(res);

        if (res?.status !== 200) {
            setResponse("Что-то пошло не так");
        }
        return res;
    }
    
    const setUserData = async (data, url) => {
        const res = await request(`${_apiBase}/api/${url}${userId}`, 'put', data);

        console.log(data);

        if (res?.status === 200) {
            setResponse("Изменения сохранены");
        } else {
            setResponse("Что-то пошло не так");
        }
        return res;
    }

    const getSpecializationsList = async () => {
        const res = await request(`${_apiBase}/api/list/specializations`, 'get');

        console.log(res);

        if (res?.status !== 200) {
            setResponse("Что-то пошло не так");
        }
        return res;
    }

    return {request, loading, response, error, clearResponse, getUserData, setUserData, getSpecializationsList}
}

export default useProfileService;