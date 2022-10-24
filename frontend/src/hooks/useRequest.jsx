import {useState, useCallback} from 'react'
import axios from "axios";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, data) => {
        setLoading(true);
        console.log(data)
        return axios.post(url, data, {headers: { "Content-Type": "application/json", "Accept": "*/*"}})
            .then(res => {
                setLoading(false);
                return res;
            })
            .catch(e => {
                setLoading(false);
                setError(true);
                return e.response;
            });
    }, []);

    return {request, loading, setLoading, response, setResponse, error, setError}
}