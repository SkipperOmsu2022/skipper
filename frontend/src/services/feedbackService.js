import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"

const useFeedbackService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = enviroments.apiBase;

    const postFeedback = async (data) => {
        const res = await request(`${_apiBase}/api/feedback/`, 'post', data);
        
        return res?.status;
    }

    return {loading, response, error, clearResponse, setResponse, postFeedback}
}

export default useFeedbackService;