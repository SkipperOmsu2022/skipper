import {useRequest} from "../hooks/useRequest"

const useSpecializationService = () => {
    const {request, loading, response, setResponse, error, clearResponse} = useRequest();

    const _apiBase = 'http://127.0.0.1:8080';

    const getSpecializationsList = async () => {
        const res = await request(`${_apiBase}/api/list/specializations`, 'get');
        
        if (res?.status !== 200) {
            setResponse("Что-то пошло не так");
        }

        const specializations = Object.entries(res?.data)?.map((item) => {
            const obj = {value: item[0], label: item[1], checked: false}
            return obj
        })

        return specializations;
    }

    return {request, loading, response, error, clearResponse, getSpecializationsList}
}

export default useSpecializationService;