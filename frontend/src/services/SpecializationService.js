import {useRequest} from "../hooks/useRequest"

const useSpecializationService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = 'http://127.0.0.1:8080';

    const getSpecializationsList = async () => {
        const res = await request(`${_apiBase}/api/list/specializations`, 'get');

        console.log(res);

        if (res?.status !== 200) {
            setResponse("Что-то пошло не так");
        }
        return res.data;
    }

    return {request, loading, response, error, clearResponse, getSpecializationsList}
}

export default useSpecializationService;