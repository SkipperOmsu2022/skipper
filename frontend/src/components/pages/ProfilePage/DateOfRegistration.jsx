import { getMonth } from '../../../utils/getDate'

const DateOfRegistration = ({date}) => {
    if(date) {
        const month = getMonth(date[1]);
        const day = +date[2]
        const year = date[0]
        return (
            <span>На Skipper c {day} {month}<br/>{year} года</span>
        )
    }
}

export default DateOfRegistration;