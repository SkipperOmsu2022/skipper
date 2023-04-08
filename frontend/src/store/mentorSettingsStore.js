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
    dirty = false;

    setSpecializationOptions = (arr) => {
        this.specializationOptions = arr;
    }

    asyncGetQualificationOptions = (e, i) => {
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
        const {qualificationId, yearStart, yearEnd, qualificationNameWithCode, educationalInstitution} = item;
        this.education.push({
            id: this.id,
            yearStart: yearStart || null,
            yearEnd: +yearEnd || null,
            qualificationId: qualificationId,
            educationalInstitution: educationalInstitution,
            label: qualificationNameWithCode?.substring(qualificationNameWithCode.indexOf(' ')+1),
            value: qualificationNameWithCode?.split(' ')[0],
            noOptionsMessage: 'Введите минимум 3 символа',
            error: [false, false, false]
        })
        this.id++;
    }
    removeEducation = (i) => {
        this.education.splice(i, 1);
    }
    setEducation = (e, i, valueName) => {
        if (valueName === 'qualification') {
            this.education[i].qualificationId = e.id;
            this.education[i].label = e.label;
            this.education[i].error[1] = false;
        } else if (valueName === 'yearStart' && +this.education[i].yearEnd < +e.value) {
            this.education[i].yearEnd = null;
            this.education[i].error[0] = false;
        } else if (valueName === 'educationalInstitution') {
            this.education[i].error[2] = false;
        } 
        this.education[i][valueName] = e.value
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
                yearStart: +item.yearStart,
                yearEnd: item.yearEnd,
                qualificationId: item.qualificationId,
                educationalInstitution: item.educationalInstitution
            }
        })
    }

    validate = () => {
        let complete = true;
        console.log(this.education)
        this.education.forEach((item) => {
            if (!(item.yearStart && item.qualificationId && item.educationalInstitution)) {
                complete = false
            }
            if (!item.yearStart) {
                item.error[0] = true
            }
            if (!item.qualificationId) {
                item.error[1] = true
            }
            if (!item.educationalInstitution) {
                item.error[2] = true
            }
        })
        this.dirty = true;
        return complete;
    }

    resetStore = () => {
        this.id = 0;
        this.specializationOptions = [];
        this.qualificationOptions = [];

        this.mentor = false;
        this.aboutMentor = "";
        this.mentorsSpecializations = [];
        this.education = []
    }
}

export default new mainPageStore();