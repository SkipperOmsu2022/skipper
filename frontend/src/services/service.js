import {useRequest} from "../hooks/useRequest"

const useService = () => {
    const {loading, setLoading, error, clearError, request} = useRequest();

    const _apiBase = 'http://127.0.0.1:8080/api/user/registration';

    const testRequest = async (data) => {
        const res = await request(`${_apiBase}`, data);
    }

    return {loading, request, error, clearError, setLoading, testRequest}
}

export default useService;