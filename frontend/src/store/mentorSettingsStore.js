import  {makeAutoObservable} from 'mobx';
import axios from "axios";

import enviroments from '../config/enviroments';

async function getBlobFromUrl(url) {
    return await fetch(url).then(r => r.blob());
}

class mentorSettingsStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    id = 0;
    specializationOptions = [];
    qualificationOptions = [];

    mentor = false;
    aboutMentor = "";
    mentorsSpecializations = [];
    educations = []
    workExperiences = []
    certificates = []
    certificatesErr = false
    dirty = false;

    setSpecializationOptions = (arr) => {
        this.specializationOptions = arr;
    }

    asyncGetQualificationOptions = (e, i) => {
        const url = enviroments.apiBase + '/api/list/edu';
        if (e.length >= 3) {
            this.educations[i].noOptionsMessage = 'Значений не найдено'
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
            this.educations[i].noOptionsMessage = 'Введите минимум 3 символа'
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
        
        res?.data?.workExperiences.forEach((item) => {
            this.addExperience(item)
        });
        
        this.certificates = res?.data?.certificatesResource?.map(item => enviroments.apiBase+item);
    }

    addEducation = (item) => {
        const {qualificationId, yearStart, yearEnd, qualificationNameWithCode, educationalInstitution} = item;
        this.educations.push({
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
        this.educations.splice(i, 1);
    }
    setEducation = (e, i, valueName) => {
        if (valueName === 'qualification') {
            this.educations[i].qualificationId = e.id;
            this.educations[i].label = e.label;
            this.educations[i].error[1] = false;
        } else if (valueName === 'yearStart' && +this.educations[i].yearEnd < +e.value) {
            this.educations[i].yearEnd = null;
            this.educations[i].error[0] = false;
        } else if (valueName === 'educationalInstitution') {
            this.educations[i].error[2] = false;
        } 
        this.educations[i][valueName] = e.value
    }

    addExperience = (item) => {
        const {yearStart, yearEnd, placeOfWork} = item;
        this.workExperiences.push({
            id: this.id,
            yearStart: yearStart || null,
            yearEnd: +yearEnd || null,
            placeOfWork: placeOfWork,
            error: [false, false]
        })
        this.id++;
    }
    setExperience = (e, i, valueName) => {
        if (valueName === 'yearStart' && +this.workExperiences[i].yearEnd < +e.value) {
            this.workExperiences[i].yearEnd = null;
            this.workExperiences[i].error[0] = false;
        } else if (valueName === 'placeOfWork') {
            this.workExperiences[i].error[1] = false;
        }
        this.workExperiences[i][valueName] = e.value
    }
    removeExperience = (i) => {
        this.workExperiences.splice(i, 1);
    }
    
    addCertificate = (item) => {
        this.certificates.push(item);
    }
    removeCertificate = (i) => {
        this.certificates.splice(i, 1);
    }
    setCertificatesErr = (error) => {
        this.certificatesErr = error;
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

    getEducations = () => {
        return this.educations.map((item) => {
            return {
                yearStart: +item.yearStart,
                yearEnd: item.yearEnd,
                qualificationId: item.qualificationId,
                educationalInstitution: item.educationalInstitution
            }
        })
    }
    getWorkExperiences = () => {
        return this.workExperiences.map((item) => {
            return {
                yearStart: +item.yearStart,
                yearEnd: item.yearEnd,
                placeOfWork: item.placeOfWork
            }
        })
    }
    getCertificates = async () => {
        return await Promise.all(this.certificates.map(async (item) => getBlobFromUrl(item)))
    }

    validate = () => {
        let complete = true;
        this.educations.forEach((item) => {
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
        this.workExperiences.forEach((item) => {
            if (!(item.yearStart && item.placeOfWork)) {
                complete = false
            }
            if (!item.yearStart) {
                item.error[0] = true
            }
            if (!item.placeOfWork) {
                item.error[1] = true
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
        this.educations = []
        this.workExperiences = []
        this.certificates = []
        this.certificatesErr = false
        this.dirty = false;
    }
}

export default new mentorSettingsStore();