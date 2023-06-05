import  {makeAutoObservable} from 'mobx';

import { addFavoriteMentor, deleteFavoriteMentor } from '../services/api';
import enviroments from '../config/enviroments';

class mentorProfileStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    id = null;
    firstName = "";
    lastName = "";
    aboutAsMentor = "";
    mentorStatus = false;
    favorite = false;
    imageUserResource = null;
    rating = null;
    dateOfRegistration = [];
    mentorSpecializations = "";
    communication = [];

    certificatesResource = [];
    educations = [];
    workExperiences = [];

    loading = false;
    
    setMentorData = (res, userId) => {
        this.id = userId
        this.firstName = res?.data?.firstName
        this.lastName = res?.data?.lastName
        this.aboutAsMentor = res?.data?.aboutAsMentor
        this.mentorSpecializations = res?.data?.mentorSpecializations
        this.dateOfRegistration = res?.data?.dateOfRegistration?.split('-')
        this.mentorStatus = res?.data?.isEnabledMentorStatus
        this.rating = res?.data?.rating
        this.communication = [
            {name: 'Вконтакте', link: res?.data?.linkVk},
            {name: 'Skype', link: res?.data?.linkSkype},
            {name: 'Discord', link: res?.data?.linkDiscord},
            {name: 'Telegram', link: res?.data?.linkTelegram}
        ]
        if (res?.data?.imageUserResource) {
            this.imageUserResource = `${enviroments.apiBase}${res?.data?.imageUserResource}`
        }
        this.certificatesResource = res?.data?.certificatesResource.map(item => enviroments.apiBase + item);
        this.educations = res?.data?.educations;
        this.workExperiences = res?.data?.workExperiences;
        this.favorite = res?.data?.favorite;
    }

    onChangeFavorite = async (userId, currentUserId) => {
        if (!this.loading) {
            this.loading = true;
            let res;
            if (this.favorite) {
                res = await deleteFavoriteMentor(userId, currentUserId)
            } else {
                res = await addFavoriteMentor(userId, currentUserId)
            }
            if (+res?.status === 200) this.changeFavorite();
            this.loading = false;
        }
    }
    changeFavorite = () => {
        this.favorite = !this.favorite;
    }

    resetStore = () => {
        this.id = null;
        this.firstName = "";
        this.lastName = "";
        this.aboutAsMentor = "";
        this.mentorStatus = false;
        this.favorite = false;
        this.imageUserResource = null;
        this.rating = null;
        this.dateOfRegistration = [];
        this.mentorSpecializations = "";
        this.communication = [];
    
        this.certificatesResource = [];
        this.educations = [];
        this.workExperiences = [];
    
        this.loading = false;
    }
}

export default new mentorProfileStore();