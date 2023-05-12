import  {makeAutoObservable} from 'mobx';

class mentorReviewsStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    modal = false;

    setModal = (state) => {
        this.modal = state;
    }
}

export default new mentorReviewsStore();