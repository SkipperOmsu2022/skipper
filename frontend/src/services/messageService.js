import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"

const useMessageService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = enviroments.apiBase;
    const userId = localStorage.getItem('logged');

    const getMessagesList = async () => {
        const res = await request(`${_apiBase}/api/chat/list-messages/${userId}`, 'get');

        if (res?.status === 200) {
            return res.data;
        } else {
            console.log(res?.message)
            setResponse("Что-то пошло не так");
        }
    }

    return {request, loading, response, error, clearResponse, getMessagesList}
}

export default useMessageService;