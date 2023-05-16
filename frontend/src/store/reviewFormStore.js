import  {makeAutoObservable} from 'mobx';

class reviewFormStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    modal = false;
    success = false;
    rating = 0;
    feedback = ""

    setModal = (state) => {
        this.modal = state;
    }

    setRating = (newRating) => {
        this.rating = newRating + 1;
    }

    setFeedback = (text) => {
        this.feedback = text;
    }

    setSuccess = () => {
        this.success = true;
    }

    resetStore = () => {
        this.modal = false;
        this.rating = 0;
        this.feedback = ""
        this.success = false
    }
}

export default new reviewFormStore();