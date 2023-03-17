import  {makeAutoObservable} from 'mobx';

class mainPageStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    mentors = []
    currentMentors = []
    filter = []
    ratingFilter = [
        {value: '5', label: '5', checked: false},
        {value: '4', label: '4',checked: false},
        {value: '3', label: '3',checked: false},
        {value: '2', label: '2',checked: false},
        {value: '1', label: '1',checked: false},
    ]
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
        this.currentMentors = this.mentors
    }

    updateCurrentMentors = () => {
        this.currentfilter = this.filter.filter((item) => item.checked).map((item) => item.label);
        this.offset = 0;
        let res = this.mentors;

        const rating = this.ratingFilter.filter((item) => item.checked).map((item) => +item.label);
        if (rating.length !== 0) {
            res = res.filter((item) => rating.some(r=> Math.round(+item.rating) === r))
        }

        if (this.currentfilter.length !== 0) {
            res = res.filter((item) => this.currentfilter.some(r=> item.mentorSpecializations.includes(r)))
        }

        if (this.search.length !== 0) {
            res = res.filter((item) => {
                const str = (item.aboutMeAsMentor + item.mentorSpecializations + item.firstName +
                    item.lastName).toLowerCase();
                    
                let searchLine = this.search.toLowerCase().trim().split(/[\s:,]/).filter(e => e.length > 1)
                if(searchLine.length === 0) {
                    searchLine = this.search.toLowerCase().trim().split(/[\s:,]/)
                } 
                if (searchLine.length > 0) {
                    return searchLine.some(r=> str.includes(r))
                } else {
                    return true;
                }
            })
        }

        this.totalMentors = res.length
        this.pageCount = Math.ceil( res.length / 6);
        this.currentMentors = res
    }

    updateOffset = (newOffset) => {
        this.offset = newOffset;
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

    resetFilter = () => {
        this.filter = this.filter.map((item) => {
            return {...item, checked: false}
        })
        this.ratingFilter = this.ratingFilter.map((item) => {
            return {...item, checked: false}
        })
        this.currentfilter = [];
    }

    changeChecked(specialization) {
        specialization.checked =  !specialization.checked;
    }
}

export default new mainPageStore();