import  {makeAutoObservable} from 'mobx';

class reviewFormStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    modal = false;
    success = false;
    rating = 0;
    feedback = ""
    error = ""

    setModal = (state) => {
        this.error = "";
        this.modal = state;
    }

    setRating = (newRating) => {
        this.rating = newRating + 1;
        this.error = "";
    }

    setFeedback = (text) => {
        this.feedback = text;
    }

    setError = (text) => {
        this.error = text;
        console.log(this.error)
    }

    setSuccess = () => {
        this.success = true;
        this.rating = 0;
        this.feedback = ""
    }

    resetStore = () => {
        this.modal = false;
        this.rating = 0;
        this.feedback = ""
        this.success = false
    }
}

export default new reviewFormStore();