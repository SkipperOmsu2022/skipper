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

const api = {
    userProfile: 'user/profile/',
    mentorProfile: 'user/profile/mentor/',
    userSettings: 'user/profile/settings/',
    userAccount: 'user/profile/settings/account/',
    userContacts: 'user/profile/settings/contacts/',
    mentorSettings: 'user/profile/settings/mentor/'
}

export {
    getEducationsList,
    addFavoriteMentor,
    deleteFavoriteMentor,
    api
}