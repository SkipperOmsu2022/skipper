import enviroments from "../config/enviroments"
import axios from "axios";

const getEducationsList = async (e) =>  {
    const url = enviroments.apiBase + '/api/list/edu';
    const res = await axios.request({url, method: 'get', params: {query: e}})
    return res;
}

export {
    getEducationsList
}