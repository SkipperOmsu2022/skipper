import {useRequest} from "../hooks/useRequest"

const useMentorSearchService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = 'http://127.0.0.1:8080';

    const getMentors = async (url, offset) => {
        const data = await request(`${url}`, 'get');
        
        return data?.data?.slice(offset, offset + 6);
    }

    return {loading, response, error, clearResponse, getMentors}
}

export default useMentorSearchService;