import  {makeAutoObservable} from 'mobx';
import {addFavoriteMentor, deleteFavoriteMentor} from '../services/api';

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
        if (data?.mentors !== undefined) {
            this.mentors = data.mentors.map(item => { return {...item, loading: false}});
            this.offset = offset;
            this.displayStart = newdisplayStart;
            
            this.totalMentors = data.total;
            this.pageCount = Math.ceil( data.total / 6);
        }
    }

    updateDisplayStart = (displayStart) => {
        this.displayStart = displayStart;
    }

    onChangeFavorite = async (mentor, userId) => {
        if (!mentor?.loading) {
            mentor.loading = true;
            let res;
            if (mentor?.favorite) {
                res = await deleteFavoriteMentor(mentor?.id, userId)
            } else {
                res = await addFavoriteMentor(mentor?.id, userId)
            }
            if (+res?.status === 200) this.changeFavorite(mentor);
            mentor.loading = false;
        }
    }
    changeFavorite = (mentor) => {
        mentor.favorite = !mentor.favorite;
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
        this.onlyWithPhoto = false
    }

    changeChecked(specialization) {
        specialization.checked =  !specialization.checked;
    }
}

export default new mainPageStore();