import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"

const useMentorSearchService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = enviroments.apiBase;
    const userId = localStorage.getItem('logged');

    const getMentors = async (url, offset) => { 
        const res = await request(`${_apiBase}/api/list/mentors${url}`, 'get');

        if (res?.status !== 201) {
            //console.log(res?.message)
            setResponse("Что-то пошло не так");
        }

        return res?.data
            ?.filter(mentor => +mentor.id !== +userId)
            ?.map(mentor => {
                return {
                    ...mentor,
                    rating: (Math.random() * (4.9 - 3.8) + 3.8).toFixed(1)
                }
            })
    }

    return {loading, response, error, clearResponse, getMentors}
}

export default useMentorSearchService;