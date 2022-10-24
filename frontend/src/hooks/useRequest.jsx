import {useState, useCallback} from 'react'
import axios from "axios";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, data) => {
        setLoading(true);

        return axios.post(url, data, {headers: { "Content-Type": "application/json", "Accept": "*/*"}})
            .then(res => {
                setLoading(false);
                console.log('Нормас');
                return res;
            })
            .catch(e => {
                setLoading(false);
                setError(e.response.data)
                return e.response;
            });
    }, []);

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError, setLoading}
}