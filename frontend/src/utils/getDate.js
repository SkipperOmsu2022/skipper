const getMonth = (month) => {
    switch(month) {
        case '01':
            return 'Января'
        case '02':
            return 'Февраля'
        case '03':
            return 'Марта'
        case '04':
            return 'Апреля'
        case '05':
            return 'Мая'
        case '06':
            return 'Июня'
        case '07':
            return 'Июля'
        case '08':
            return 'Августа'
        case '09':
            return 'Сентрября'
        case '10':
            return 'Октября'
        case '11':
            return 'Ноября'
        case '12':
            return 'Декабря'
        default:
            break;
    }
}

const getMonthShort = (month) => {
    return getMonth(month).slice(0, 3)
}

const getDate = (stringDate) => {
    const date = stringDate?.split('-')
    const month = getMonth(date[1]);
    const day = +date[2]
    const year = date[0]


    return `${day} ${month} ${year}`
}

export {
    getMonth,
    getMonthShort,
    getDate
}