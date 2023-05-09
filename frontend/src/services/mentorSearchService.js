import enviroments from "../config/enviroments";

import {useRequest} from "../hooks/useRequest"

const useMentorSearchService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = enviroments.apiBase;

    const getMentors = async (dto) => {
        const params = new URLSearchParams(dto);
        const res = await request(`${_apiBase}/api/list/mentors/page_sort_filter?${params.toString()}`, 'get',);
        
        if (res?.status !== 201) {
            setResponse("Что-то пошло не так");
        }
        console.log(res)
        return {
            mentors: res?.data?.content,
            total: res?.data?.totalElement
        }
    }

    return {loading, response, error, clearResponse, getMentors}
}

export default useMentorSearchService;