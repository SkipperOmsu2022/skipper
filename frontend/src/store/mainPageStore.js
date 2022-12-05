import  {makeAutoObservable} from 'mobx';

class mainPageStore {
    constructor() {
        makeAutoObservable(this)
    }

    /* mentors = [
        {firstName: 'Антон', lastName: 'Анисимов', specialty: 'Программирование', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 1},
        {firstName: 'Александр', lastName: 'Артамонов', specialty: 'Тестирование', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 2},
        {firstName: 'Никита', lastName: 'Головатый', specialty: 'DevOps', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 3},
        {firstName: 'Дарья', lastName: 'Гофман', specialty: 'Аналитика', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 4},
        {firstName: 'Степан', lastName: 'Дубовицкий', specialty: 'Администрирование', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 5},
        {firstName: 'Анастасия', lastName: 'Зайнутдинова', specialty: 'Бухгалтерия', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 6},
        {firstName: 'Алексей', lastName: 'Иванов', specialty: 'Откаты', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 7},
        {firstName: 'Владислав', lastName: 'Клюев', specialty: 'Счетоводство', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 8},
        {firstName: 'Дарья', lastName: 'Лаврова', specialty: 'Налоги', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 9},
        {firstName: 'Даниил', lastName: 'Шахматов', specialty: 'Жилищные вопросы', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 10},
        {firstName: 'Никита', lastName: 'Дербенёв', specialty: 'Бытовые вопросы', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 11},
        {firstName: 'Алексей', lastName: 'Лебедев', specialty: 'Тяжкие преступления', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 12},
        {firstName: 'Илья', lastName: 'Маняпов', specialty: 'Программирование', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 13},
        {firstName: 'Алексей', lastName: 'Панфилов', specialty: 'Аналитика', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 14},
        {firstName: 'Антон', lastName: 'Никачёв', specialty: 'Счетоводство', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 15},
        {firstName: 'Дмитрий', lastName: 'Нестеренко', specialty: 'DevOps', aboutMe: 'Расскажу о себе попозже', favorite: false, id: 16}
    ]; */

    mentors = []
    filter = []

    offset = 0;
    totalMentors = 500;

    requestMentors = (newOffset) => {
        this.loading = true;
        this.offset = newOffset;
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(items => {
                this.totalMentors = items.length;
                this.mentors = items.slice(this.offset, this.offset + 6);
                console.log(this.mentors)
            })
    }

    setMentors = (mentors, newOffset) => {
        this.offset = newOffset;
        this.mentors = mentors;
    }
    changeFavorite(mentor) {
        mentor.favorite =  !mentor.favorite;
    }
    
    setFilter = (filter) => {
        this.filter = filter;
    }
    changeChecked(specialization) {
        specialization.checked =  !specialization.checked;
    }
}

export default new mainPageStore();