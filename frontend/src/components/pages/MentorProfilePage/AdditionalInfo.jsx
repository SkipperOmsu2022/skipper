import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";

import DateOfRegistration from "../ProfilePage/DateOfRegistration";
import mentorProfileStore from '../../../store/mentorProfileStore';
import StarsRating from '../../StarsRating/StarsRating';

import "../../../shared/submitButton/button.scss"

const AdditionalInfo = observer(({isOwner, mentorId}) => {
    
    return (
        <div className="app-section profile additional-info">
            <div className="main-block">
                <StarsRating rating={mentorProfileStore.rating} summary/>
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