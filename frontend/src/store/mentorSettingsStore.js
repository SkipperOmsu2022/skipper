import  {makeAutoObservable} from 'mobx';
import axios from "axios";

import enviroments from '../config/enviroments';

class mainPageStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    id = 0;
    specializationOptions = [];
    qualificationOptions = [];

    mentor = false;
    aboutMentor = "";
    mentorsSpecializations = [];
    education = []

    setSpecializationOptions = (arr) => {
        this.specializationOptions = arr;
    }

    setQualificationOptions = (e, i) => {
        const url = enviroments.apiBase + '/api/user/profile/settings/mentor/edu';
        if (e.length >= 3) {
            this.education[i].noOptionsMessage = 'Значений не найдено'
            return axios.request({url, method: 'get', params: {query: e}})
                .then(res => {
                    return(res.data.map((item) => {
                        return {
                            id: item.id,
                            value: item.code,
                            label: item.name
                        }
                    }))
                })
        } else {
            this.education[i].noOptionsMessage = 'Введите минимум 3 символа'
            return new Promise((resolve) => resolve([]));
        }
    }

    setMentorData = (res) => {
        this.mentor = res?.data?.isEnabledMentorStatus || false;
        this.aboutMentor = res?.data?.aboutMeAsMentor || '';
        this.mentorsSpecializations = res?.data?.mentorSpecializations
            ?.map((item) => this.specializationOptions.find(option => option.value === item)) || '';
        res?.data?.educations.forEach((item) => {
            this.addEducation(item)
        });
    }

    addEducation = (item) => {
        const {dateStart, dateEnd, qualificationNameWithCode, educationalInstitution} = item;
        this.education.push({
            id: this.id,
            dateStart: '2018' || null,
            dateEnd: 2023 || undefined,
            qualificationId: null,
            educationalInstitution: educationalInstitution,
            label: qualificationNameWithCode?.split(' ')[1],
            value: qualificationNameWithCode?.split(' ')[0],
            noOptionsMessage: 'Введите минимум 3 символа'
        })
        this.id++;
        console.log(this.education)
    }
    removeEducation = (i) => {
        this.education.splice(i, 1);
    }
    setEducation = (e, i, valueName) => {
        if (valueName === 'qualification') {
            this.education[i].qualificationId = e.id;
            this.education[i].label = e.label;
            this.education[i].value = e.value;
        } else {
            this.education[i][valueName] = e.value
        }
    }

    handleSwitchChange = () => {
        if(this.mentor && this.aboutMentor && this.mentorsSpecializations.length) {
            this.mentor = false;
        } else if (this.aboutMentor && this.mentorsSpecializations.length) {
            this.mentor = true;
        }
    }

    handleAboutMeChange = (e) => {
        this.aboutMentor = e.target.value
        if (!e.target.value || !this.mentorsSpecializations.length) {
           this.mentor = false
        }
    }

    handleSpecializationChange = (e) => {
        this.mentorsSpecializations = Array.isArray(e) ? e : []
        if (!this.aboutMentor || e?.length === 0) {
            this.mentor = false;
        }
    }

    getEducation = () => {
        return this.education.map((item) => {
            return {
                dateStart: item.dateStart + '-03-17',
                dateEnd: item.dateEnd + '-03-17',
                qualificationId: item.qualificationId,
                educationalInstitution: item.educationalInstitution
            }
        })
    }

    validate = () => {
        let complete = true;
        console.log(this.education)
        this.education.forEach((item) => {
            if (!(item.dateStart && item.dateEnd !== undefined && item.qualificationId && item.educationalInstitution)) {
                complete = false
            }
        })
        return complete;
    }
}

export default new mainPageStore();