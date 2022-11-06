import {useState, useCallback} from 'react'
import axios from "axios";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(false);

    const clearResponse = () => {
        setResponse(null);
        setError(false);
    }

    const request = useCallback(async (url, data) => {
        clearResponse();
        setLoading(true);
        
        let form_data = new FormData();

        for ( var key in data ) {
            form_data.append(key, data[key]);
        }

        return axios.post(url, form_data, {headers: { "Content-Type": 'multipart/form-data', "Accept": "*/*"}})
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

    return {request, loading, setLoading, response, setResponse, error, clearResponse}
}