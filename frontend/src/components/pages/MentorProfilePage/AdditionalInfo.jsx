import "../../../shared/submitButton/button.scss"

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

const getDate = (dateOfRegistration) => {
    const month = getMonth(dateOfRegistration[1]);
    const day = +dateOfRegistration[2]
    const year = dateOfRegistration[0]
    return (
        <span>На Skipper c {day} {month}<br/>{year} года</span>
    )
}

const AdditionalInfo = ({props}) => {
    const {dateOfRegistration, mentorStatus} = props;

    return (
        <div className="app-section profile additional-info">
            <div className="main-block">
                <div className="stars-rating">
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9734;
                    </div>
                    <span className="grade" >4,0</span>
                </div>
                <div className="main-block__section">
                    <span>45 студентов</span>
                    <span>248 занятий</span>
                </div>
                <div className="main-block__section">
                    {getDate(dateOfRegistration)}
                </div>
            </div>
            <div className="profile__btn-block full-width">
                <span className="profile__btn-block-name">Консультация:</span>
                <button
                    disabled={!mentorStatus}
                    className={`button${mentorStatus ? '' : ' inactive'}`}
                    >
                    Забронировать
                </button>
                <button className="button">Написать сообщение</button>
            </div>
        </div>
    )
}

export default AdditionalInfo;
export {getDate}