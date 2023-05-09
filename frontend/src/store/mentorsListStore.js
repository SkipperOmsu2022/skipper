import  {makeAutoObservable} from 'mobx';
import {addFavoriteMentor, deleteFavoriteMentor} from '../services/api';

class mentorsListStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    mentors = []
    displayStart = 0
    
    offset = 0;
    pageCount = 0;
    totalMentors = 0;
    
    setMentors = (data, offset, newdisplayStart, itemsPerPage) => {
        if (data?.mentors !== undefined) {
            this.mentors = data.mentors.map(item => { return {...item, loading: false}});
            this.offset = offset;
            this.displayStart = newdisplayStart;
            
            this.totalMentors = data.total;
            this.pageCount = Math.ceil( data.total / itemsPerPage);
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

    resetStore = () => {
        this.mentors = []
        this.displayStart = 0
        
        this.offset = 0;
        this.pageCount = 0;
        this.totalMentors = 0;
    }
}

export default new mentorsListStore();