import  {makeAutoObservable} from 'mobx';

import enviroments from '../config/enviroments';

class mentorProfileStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    firstName = "";
    lastName = "";
    aboutAsMentor = "";
    mentorStatus = false;
    imageUserResource = null;
    rating = null;
    dateOfRegistration = [];
    mentorSpecializations = "";
    communication = [];

    certificatesResource = [];
    educations = [];
    workExperiences = [];
    
    setMentorData = (res) => {
        console.log(res)
        this.firstName = res?.data?.firstName
        this.lastName = res?.data?.lastName
        this.aboutAsMentor = res?.data?.aboutAsMentor
        this.mentorSpecializations = res?.data?.mentorSpecializations
        this.dateOfRegistration = res?.data?.dateOfRegistration?.split('-')
        this.mentorStatus = res?.data?.isEnabledMentorStatus
        this.rating = res?.data?.rating || 4.9
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
    }

    resetStore = () => {
        this.firstName = "";
        this.lastName = "";
        this.aboutAsMentor = "";
        this.mentorStatus = false;
        this.imageUserResource = "";
        this.rating = 4.9;
        this.dateOfRegistration = [];
        this.mentorSpecializations = "";
        this.communication = [];
    }
}

export default new mentorProfileStore();