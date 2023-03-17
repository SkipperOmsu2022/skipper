import  {makeAutoObservable} from 'mobx';

class mainPageStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    specializationOptions = [];

    mentor = false;
    aboutMentor = "";
    mentorsSpecializations = [];

    setSpecializationOptions = (arr) => {
        this.specializationOptions = arr;
    }

    setMentorData = (res) => {
        this.mentor = res?.data?.isEnabledMentorStatus || false;
        this.aboutMentor = res?.data?.aboutMeAsMentor || '';
        this.mentorsSpecializations = res?.data?.mentorSpecializations
            ?.map((item) => this.find(option => option.value === item)) || '';
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
}

export default new mainPageStore();