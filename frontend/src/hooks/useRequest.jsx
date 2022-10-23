import {useState, useCallback} from 'react'
import axios from "axios";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // method = 'GET', body = null, headers = {'Content-Type': 'application/json'}
    // {method, body, headers}

    const request = useCallback(async (url, data) => {
        setLoading(true);

        try {
            const response = await axios.post(url, data);
            setLoading(false);

            return response;
        } catch (e) {
            setLoading(false);
            setError(e.message)
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError, setLoading}
}