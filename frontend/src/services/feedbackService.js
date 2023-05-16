import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"

const useFeedbackService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = enviroments.apiBase;

    const postFeedback = async (data) => {
        const res = await request(`${_apiBase}/api/feedback/`, 'post', data);
        
        return res?.status;
    }

    const getFeedback = async (dto) => {
        const params = new URLSearchParams(dto);
        const res = await request(`${_apiBase}/api/feedback/?${params.toString()}`, 'get');
        
        return res;
    }

    return {loading, response, error, clearResponse, setResponse, postFeedback, getFeedback}
}

export default useFeedbackService;