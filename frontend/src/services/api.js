import enviroments from "../config/enviroments"
import axios from "axios";

const getEducationsList = async (e) =>  {
    const url = enviroments.apiBase + '/api/list/edu';
    const res = await axios.request({url, method: 'get', params: {query: e}})
    return res;
}

const addFavoriteMentor = async (mentorId, userId) =>  {
    const url = enviroments.apiBase + `/api/user/favorite/${userId}/${mentorId}`;
    const res = await axios.request({url, method: 'post'})
    return res;
}

const deleteFavoriteMentor = async (mentorId, userId) =>  {
    const url = enviroments.apiBase + `/api/user/favorite/${userId}/${mentorId}`;
    const res = await axios.request({url, method: 'delete'})
    return res;
}

export {
    getEducationsList,
    addFavoriteMentor,
    deleteFavoriteMentor
}