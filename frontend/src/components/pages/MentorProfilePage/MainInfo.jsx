import { useEffect, useState, useRef } from "react"
import { observer } from "mobx-react-lite";

import mentorProfileStore from '../../../store/mentorProfileStore';
import { useRequireAuth } from '../../Auth/RequireAuth'
import CommunicationContent from "../ProfilePage/CommunicationContent";

import photo from "../../../resources/profile-photo.jpg"
import bookmark from "../../../resources/icons/bookmark.svg";
import "../../../shared/bookmark.scss"



const MainInfo = observer(({mentorId, currentUserId}) => {
    const onChangeFav = useRequireAuth(() => mentorProfileStore.onChangeFavorite(mentorId, currentUserId));
    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    const container = useRef();
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        
        return () => {
            document.removeEventListener("click",  handleClickOutside);
        }
    }, []);


    const handleDropdownClick = () => setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownDisplay(false);
        }
    };

    const dropdown = `dropdown ${dropdownDisplay ? '' : 'hide'}`;

    return (
        <div className="app-section profile mentor">
            <div className="profile__section">
                <div className="profile__section-row">
                    <img
                        className="profile__photo"
                        src={mentorProfileStore.imageUserResource || photo}
                        alt="user-avatar"
                    />
                    <div className="profile__main-info">
                        <div className="name">{mentorProfileStore.firstName} {mentorProfileStore.lastName}</div>
                        <div className="specialty">{mentorProfileStore.mentorSpecializations}</div>
                    </div>
                    {currentUserId !== mentorId ? 
                    <label className="profile__bookmark" htmlFor="switch">
                        <input
                            type="checkbox"
                            className="bookmark-input"
                            id="switch"
                            checked={mentorProfileStore.favorite}
                            onChange={onChangeFav}
                        />
                        <img className="bookmark-icon bookmark" src={bookmark} alt="" />
                    </label> : null
                    }
                </div>
                <div className="complain-btn" ref={container} onClick={handleDropdownClick}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);
                        }
                    }}
                >
                    !
                    <div className={dropdown}>
                        <div className="dropdown-item">Заблокировать пользователя</div>
                        <div className="dropdown-item">Пожаловаться</div>
                    </div>
                </div>
            </div>
            <div className="profile__section-label">О себе</div>
            {mentorProfileStore.aboutAsMentor ? 
            <div className="profile__section-content">
                {mentorProfileStore.aboutAsMentor}
            </div> :
            <div className="profile__no-info">
                Пользователь не предоставил информацию о себе
            </div>}
            <div className="profile__section">
                <CommunicationContent communication={mentorProfileStore.communication}/>
            </div>
        </div>
    )
})

export default MainInfo;