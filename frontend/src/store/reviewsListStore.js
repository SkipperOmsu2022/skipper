import  {makeAutoObservable} from 'mobx';

class reviewsListStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    totalElement = 0
    offset = 0
    displayStart = 0
    firstReviews = []
    reviews = []
    itemsPerPage = 6;
    limitPerRequest = 18;
    pageCount = 1;
    modal = false;
    reviewIdToDelete = null;

    setFirstReviews = (res) => {
        this.firstReviews = res?.data?.content
        this.totalElement = res?.data?.totalElement
    }

    setReviews = (res, offset, newdisplayStart) => {
        if (res?.data?.content !== undefined) {
            this.reviews = res?.data?.content;
            this.offset = offset;
            this.displayStart = newdisplayStart;
            
            this.totalElement = res?.data?.totalElement;
            this.pageCount = Math.ceil( res?.data?.totalElement / this.itemsPerPage);
        }
    }

    updateDisplayStart = (displayStart) => {
        this.displayStart = displayStart;
    }

    setModal = (state) => {
        this.modal = state;
    }
    setReviewIdToDelete = (id) => {
        this.reviewIdToDelete = id;
    }

    resetStore = () => {
        this.totalElement = 0
        this.offset = 0
        this.reviews = []
        this.itemsPerPage = 6;
        this.pageCount = 1;
        this.modal = false;
    }
}

export default new reviewsListStore();