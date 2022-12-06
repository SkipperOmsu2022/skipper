import  {observable, makeAutoObservable} from 'mobx';

class mainPageStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    mentors = []
    currentMentors = []
    filter = []
    currentfilter = []
    search = ""
    
    offset = 0;
    pageCount = 0;
    totalMentors = 0;

    setMentors = (mentors) => {
        this.offset = 0;
        this.mentors = mentors;
        this.totalMentors = mentors.length
        this.pageCount = Math.ceil( this.mentors.length / 6);
        this.currentMentors = this.mentors.slice(0, 6)
    }

    updateCurrentMentors = (newOffset) => {
        this.currentfilter = this.filter.filter((item) => item.checked).map((item) => item.value);
        this.offset = newOffset;
        let res = this.mentors;

        if (this.currentfilter.length !== 0) {
            res = res.filter((item) => this.currentfilter.some(r=> item.mentorSpecializations.includes(r)))
        }

        if (this.search.length !== 0) {
            res = res.filter((item) => item.aboutMeAsMentor.toLowerCase().includes(this.search.toLowerCase()))
        }

        this.totalMentors = res.length
        this.pageCount = Math.ceil( res.length / 6);
        this.currentMentors = res.slice(newOffset, newOffset + 6)
    }

    changeFavorite = (mentor) => {
        mentor.favorite =  !mentor.favorite;
    }

    setSearch = (search) => {
        this.search = search;
    }

    setFilter = (filter) => {
        this.filter = filter;
    }

    setCurrentFilter = () => {
        this.currentfilter = this.filter.filter((item) => item.checked).map((item) => item.value);
    }

    resetFilter = () => {
        this.filter = this.filter.map((item) => {
            return {...item, checked: false}
        })
        this.currentfilter = [];
    }

    changeChecked(specialization) {
        specialization.checked =  !specialization.checked;
    }
}

export default new mainPageStore();