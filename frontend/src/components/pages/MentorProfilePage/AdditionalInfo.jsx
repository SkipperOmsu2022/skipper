import "../../../shared/submitButton/button.scss"
import DateOfRegistration from "../ProfilePage/DateOfRegistration";

const AdditionalInfo = ({props}) => {
    const {dateOfRegistration, mentorStatus, isOwner} = props;

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
                    <DateOfRegistration date={dateOfRegistration}/>
                </div>
            </div>
            { isOwner ? null :
            <div className="profile__btn-block full-width">
                <span className="profile__btn-block-name">Консультация:</span>
                <button
                    disabled={!mentorStatus}
                    className={`button${mentorStatus ? '' : ' inactive'}`}
                    >
                    Забронировать
                </button>
                <button className="button">Написать сообщение</button>
            </div>}
        </div>
    )
}

export default AdditionalInfo;