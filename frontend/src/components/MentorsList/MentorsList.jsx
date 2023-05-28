import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";

import mentorsListStore from '../../store/mentorsListStore';
import useAuthContext from '../../hooks/useAuthContext';
import { useRequireAuth } from '../Auth/RequireAuth'

import bookmark from "../../resources/icons/bookmark.svg";
import { getImageUserResource } from '../../utils/getImageSource';

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
    const { auth: userId } = useAuthContext();
    const onChangeFav = useRequireAuth(() => onChangeFavorite(mentor, userId));

    const imageUserResource = getImageUserResource(mentor.imageUserResource);
    return (
        <div className={`mentor ${maxWidth ? 'max-width' : ''}`} key={mentor.id}>
            <div className="mentor__photo">
                <Link
                    className=""
                    to={`/profile/${mentor.id}`}
                    relative={false}
                >
                    <img src={imageUserResource} alt="user-avatar" className="mentor__photo-img user-photo"/>
                </Link>
                <div className="rating">
                    <span className="rating-star">&#9733;</span>
                    <span className="rating-value">{mentor?.rating?.toFixed(1) || '–'}</span>
                </div>
            </div>
            <div className="mentor__main-info">
                <div className="header">
                    <div className="header__column">
                        <Link
                            className="header__column-name"
                            to={`/profile-mentor/${mentor.id}`}
                        >
                            {`${mentor.firstName} ${mentor.lastName}`}
                        </Link>
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
                            onChange={onChangeFav}
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
                    <span>{mentor?.numberFeedbacks} отзывов</span>
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