import  {makeAutoObservable} from 'mobx';

class mentorReviewsListStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    modal = false;

    setModal = (state) => {
        this.modal = state;
    }

    resetStore = () => {
        
    }
}

export default new mentorReviewsListStore();