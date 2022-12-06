import {useRequest} from "../hooks/useRequest"

const useMentorSearchService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = 'http://127.0.0.1:8080';
    const userId = localStorage.getItem('logged');

    const getMentors = async (url, offset) => {
        const res = await request(`http://127.0.0.1:8080/api/list/mentors${url}`, 'get');

        if (res?.status !== 201) {
            setResponse("Что-то пошло не так");
        }

        return res?.data?.filter(mentor => +mentor.id !== +userId);
    }

    return {loading, response, error, clearResponse, getMentors}
}

export default useMentorSearchService;