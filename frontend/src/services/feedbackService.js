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
    
    const getUserFeedback = async (mentorId , userAuthorId) => {
        const res = await request(`${_apiBase}/api/feedback/${mentorId}/${userAuthorId}`, 'get');
        if (+res?.status === 404)
            clearResponse()
        else {
            setResponse('Что-то пошло не так, попробуйте еще раз через некоторое время')
        }
        return res?.data;
    }
    
    const deleteUserFeedback = async (mentorId , userAuthorId) => {
        const res = await request(`${_apiBase}/api/feedback/${mentorId}/${userAuthorId}`, 'delete');
        
        return res?.status;
    }

    return {loading, response, error, clearResponse, setResponse, postFeedback, getFeedback, getUserFeedback, deleteUserFeedback}
}

export default useFeedbackService;