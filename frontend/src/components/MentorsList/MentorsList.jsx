import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import enviroments from '../../config/enviroments';
import mentorsListStore from '../../store/mentorsListStore';

import photo from "../../resources/profile-photo.jpg"
import bookmark from "../../resources/icons/bookmark.svg";

const MentorsList = observer(({displayStart, maxWidth}) => {
    return mentorsListStore.mentors.slice(displayStart, displayStart + 6).map((item) => {
        return (
            <MentorCard
                mentor={item}
                onChangeFavorite={mentorsListStore.onChangeFavorite}
                maxWidth={maxWidth}
            />
        )
    })
})

const MentorCard = observer(({mentor, onChangeFavorite, maxWidth}) => {
    const userId = +localStorage.getItem('logged');
    const imageUserResource = mentor.imageUserResource ? `${enviroments.apiBase}${mentor.imageUserResource}` : photo;

    return (
        <div className={`mentor ${maxWidth ? 'max-width' : ''}`} key={mentor.id}>
            <div className="mentor__photo">
                <img className="mentor__photo-img" src={imageUserResource} alt="user-avatar"/>
                <div className="rating">
                    <span className="rating-star">&#9733;</span>
                    <span className="rating-value">{mentor.rating || '-'}</span>
                </div>
            </div>
            <div className="mentor__main-info">
                <div className="header">
                    <div className="header__column">
                        <div className="header__column-name">
                            {`${mentor.firstName} ${mentor.lastName}`}
                        </div>
                        <div className="header__column-specialty">
                            {mentor.mentorSpecializations}
                        </div>
                    </div>
                    <label className="header__bookmark bookmark" htmlFor={`switch${mentor.id}`}>
                        <input
                            type="checkbox"
                            className="bookmark-input"
                            id={`switch${mentor.id}`}
                            checked={mentor.favorite}
                            onChange={() => onChangeFavorite(mentor, userId)}
                        />
                        <img className="bookmark-icon" src={bookmark} alt="" />
                    </label>
                </div>
                <div className="description">
                    {mentor.aboutMeAsMentor}
                </div>
            </div>
            <div className="mentor__divider"/>
            <div className="mentor__interaction">
                <div className="mentor__interaction-info">
                    <span>От 1200 ₽</span>
                    <span>20 отзывов</span>
                </div>
                <div className="mentor__interaction-btn-block">
                    <button className="button">Забронировать</button>
                    <Link
                        to={`/profile-mentor/${mentor.id}`}
                        className="button pale"
                    >
                        Посмотреть профиль
                    </Link>
                </div>
            </div>
        </div>
    )
})

export default MentorsList;