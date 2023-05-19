import  {makeAutoObservable} from 'mobx';

class reviewFormStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    modal = false;
    alreadyLeftAReview = false;
    success = false;
    rating = 0;
    feedback = ""
    error = ""
    reviewIdToDelete = null;

    setModal = (state) => {
        this.error = "";
        this.modal = state;
        this.success = false;
    }
    
    onCancel = () => {
        if (!this.alreadyLeftAReview) {
            this.resetStore();
        } else {
            this.error = "";
            this.modal = false;
            this.success = false;
        }
    }

    setReview = (res) => {
        this.rating = res?.rating || 0;
        this.feedback = res?.text || "";
        this.alreadyLeftAReview = res?.text && true;
    }

    setRating = (newRating) => {
        this.rating = newRating + 1;
        this.error = "";
    }

    setFeedback = (text) => {
        this.feedback = text;
    }
    
    setReviewIdToDelete = (id) => {
        this.reviewIdToDelete = id;
    }

    setError = (text) => {
        this.error = text;
    }

    setSuccess = () => {
        this.success = true;
        this.alreadyLeftAReview = true;
    }

    resetStore = () => {
        this.alreadyLeftAReview = false;
        this.modal = false;
        this.rating = 0;
        this.error = false
        this.feedback = "";
        this.success = false;
        this.reviewIdToDelete = null;
    }
}

export default new reviewFormStore();