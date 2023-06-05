import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"
import useAuthContext from "../hooks/useAuthContext";

const useMessageService = () => {
    const { auth: userId } = useAuthContext();
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = enviroments.apiBase;

    const getMessagesList = async () => {
        if (userId) {
            const res = await request(`${_apiBase}/api/chat/list-messages/${userId}`, 'get');

            if (res?.status === 200) {
                return res.data;
            } else {
                console.log(res?.message)
                setResponse("Что-то пошло не так");
            }
        }
    }

    return {request, loading, response, error, clearResponse, getMessagesList}
}

export default useMessageService;