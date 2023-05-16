import  {makeAutoObservable} from 'mobx';

class reviewsListStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    totalElement = 0
    reviews = []
    firstReviews = []
    modal = false;

    setFirstReviews = (res) => {
        this.firstReviews = res?.data?.content
        this.totalElement = res?.data?.totalElement
    }

    setModal = (state) => {
        this.modal = state;
    }

    resetStore = () => {
        
    }
}

export default new reviewsListStore();