import {useState, useCallback} from 'react'
import axios from "axios";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, data) => {
        setLoading(true);

        axios.post(url, data, {headers: { "Content-Type": "application/json", "Content-Lenght": "<calculated hen request is sent>",
                                           "User-Agent": "PostmanRuntime/7.29.2", "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br",
                                        "Connection": "keep-alive" }})
            .then(res => {
                setLoading(false);
                console.log('Нормас');
                console.log(res);
            })
            .catch(e => {
                setLoading(false);
                setError(e.message)
                console.log('Ошибка');
                console.log(e);
            });
    }, []);

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError, setLoading}
}