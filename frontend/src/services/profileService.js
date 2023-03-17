import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"

const useProfileService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = enviroments.apiBase;
    const userId = localStorage.getItem('logged');

    const getUserData = async (url, id) => {
        const res = await request(`${_apiBase}/api/${url}${id || userId}`, 'get');
        
        if (res?.status === 200) {
            return res;
        } else {
            console.log(res?.message)
            setResponse("Что-то пошло не так");
        }
    }
    
    const setUserData = async (data, url, headers) => {
        console.log(data)
        const res = await request(`${_apiBase}/api/${url}${userId}`, 'put', data, headers);

        if (res?.status === 200) {
            setResponse("Изменения сохранены");
        } else {
            console.log(res?.message)
            setResponse("Что-то пошло не так");
            return res;
        }
    }

    const getSpecializationsList = async () => {
        const res = await request(`${_apiBase}/api/list/specializations`, 'get');

        if (res?.status === 200) {
            return res;
        } else {
            setResponse("Что-то пошло не так");
        }
    }

    return {request, loading, response, error, clearResponse, getUserData, setUserData, getSpecializationsList}
}

export default useProfileService;