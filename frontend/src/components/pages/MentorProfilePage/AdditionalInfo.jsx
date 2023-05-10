import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";

import DateOfRegistration from "../ProfilePage/DateOfRegistration";
import mentorProfileStore from '../../../store/mentorProfileStore';

import "../../../shared/submitButton/button.scss"

const AdditionalInfo = observer(({isOwner, mentorId}) => {

    let filledStars = null, hollowStars = null;
    if (mentorProfileStore.rating) {
        const roundedRating = Math.round(+mentorProfileStore.rating)
        
        filledStars = Array.from({length: roundedRating}, (_, i) => <div className="star" key={i}>&#9733;</div>);
        hollowStars = Array.from({length: 5 - roundedRating}, (_, i) => <div className="star" key={i}>&#9734;</div>);
    }
    
    return (
        <div className="app-section profile additional-info">
            <div className="main-block">
                <div className="stars-rating">
                    {filledStars}
                    {hollowStars}
                    <span className="grade" >{(mentorProfileStore.rating + '').slice(0, 3)}</span>
                </div>
                <div className="main-block__section">
                    <span>45 студентов</span>
                    <span>248 занятий</span>
                </div>
                <div className="main-block__section">
                    <DateOfRegistration date={mentorProfileStore.dateOfRegistration}/>
                </div>
            </div>
            { isOwner ? null :
            <div className="profile__btn-block full-width">
                <span className="profile__btn-block-name">Консультация:</span>
                <button
                    disabled={!mentorProfileStore.mentorStatus}
                    className={`button${mentorProfileStore.mentorStatus ? '' : ' inactive'}`}
                    >
                    Забронировать
                </button>
                <Link
                    to={`/messages`}
                    state={{ activeDialog: mentorId }}
                    className="button"
                >
                    Написать сообщение
                </Link>
            </div>}
        </div>
    )
})

export default AdditionalInfo;