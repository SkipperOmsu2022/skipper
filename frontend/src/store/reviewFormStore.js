import  {makeAutoObservable} from 'mobx';

class reviewFormStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    modal = false;
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

    resetStore = () => {
        this.rating = 0;
    }
}

export default new reviewFormStore();