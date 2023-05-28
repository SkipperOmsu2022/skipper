import  {makeAutoObservable} from 'mobx';

class mentorsFilterStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    specializations = []
    ratingFilter = [
        {value: '5', label: '5', checked: false},
        {value: '4', label: '4',checked: false},
        {value: '3', label: '3',checked: false},
        {value: '2', label: '2',checked: false},
        {value: '1', label: '1',checked: false},
    ]
    search = ""
    onlyWithPhoto = false;
    
    changeOnlyWithPhoto = () => {
        this.onlyWithPhoto = !this.onlyWithPhoto;
    }

    setSearch = (search) => {
        this.search = search;
    }

    setSpecializations = (specializations) => {
        this.specializations = specializations;
    }

    reset = () => {
        this.specializations = this.specializations.map((item) => {
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

export default new mentorsFilterStore();