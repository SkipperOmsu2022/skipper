import  {makeAutoObservable} from 'mobx';

class mainPageStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    mentors = []
    displayStart = 0
    filter = []
    ratingFilter = [
        {value: '5', label: '5', checked: false},
        {value: '4', label: '4',checked: false},
        {value: '3', label: '3',checked: false},
        {value: '2', label: '2',checked: false},
        {value: '1', label: '1',checked: false},
    ]
    search = ""
    
    offset = 0;
    pageCount = 0;
    totalMentors = 0;
    onlyWithPhoto = false;
    
    setMentors = (data, offset, newdisplayStart) => {
        this.mentors = data.mentors;
        this.offset = offset;
        this.displayStart = newdisplayStart;
        
        this.totalMentors = data.total;
        this.pageCount = Math.ceil( data.total / 6);
    }

    updateDisplayStart = (displayStart) => {
        this.displayStart = displayStart;
    }

    changeFavorite = (mentor) => {
        mentor.favorite =  !mentor.favorite;
    }
    
    changeOnlyWithPhoto = () => {
        this.onlyWithPhoto = !this.onlyWithPhoto;
        console.log(this.onlyWithPhoto)
    }

    setSearch = (search) => {
        this.search = search;
    }

    setFilter = (filter) => {
        this.filter = filter;
    }

    reset = () => {
        this.filter = this.filter.map((item) => {
            return {...item, checked: false}
        })
        this.ratingFilter = this.ratingFilter.map((item) => {
            return {...item, checked: false}
        })
        this.search = ""
    }

    changeChecked(specialization) {
        specialization.checked =  !specialization.checked;
    }
}

export default new mainPageStore();