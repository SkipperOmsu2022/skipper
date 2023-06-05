import  {makeAutoObservable} from 'mobx';

class mentorsFilterStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    specializations = []
    sortOptions = [
        {value: 'DEFAULT', label: 'По умолчанию'},
        {value: 'RATING', label: 'По рейтингу'}
    ]
    sortField = {value: 'DEFAULT', label: 'По умолчанию'}
    search = ""
    onlyWithPhoto = false;
    
    changeOnlyWithPhoto = () => {
        this.onlyWithPhoto = !this.onlyWithPhoto;
    }

    setSortField = (sortField) => {
        this.sortField = sortField;
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
        this.search = ""
        this.onlyWithPhoto = false
    }

    changeChecked(specialization) {
        specialization.checked =  !specialization.checked;
    }
}

export default new mentorsFilterStore();