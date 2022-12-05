import { useEffect, useState, useRef } from "react"
import {communicationContent} from '../ProfilePage/ProfilePage'

import photo from "../../../resources/profile-photo.jpg"
import bookmark from "../../../resources/icons/bookmark.svg";
import "../../../shared/bookmark.scss"

const MainInfo = ({props}) => {
    const {firstName, lastName, mentorSpecializations, aboutAsMentor, communication} = props;
    console.log(firstName)

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        
        return () => {
            document.removeEventListener("click",  handleClickOutside);
        }
    }, []);

    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    const container = useRef();

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
                    <img className="profile__photo" src={photo} alt="" />
                    <div className="profile__main-info">
                        <div className="name">{firstName} {lastName}</div>
                        <div className="specialty">{mentorSpecializations}</div>
                    </div>
                    <label className="profile__bookmark" htmlFor="switch">
                        <input type="checkbox" className="bookmark-input" id="switch"/>
                        <img className="bookmark-icon bookmark" src={bookmark} alt="" />
                    </label>
                </div>
                <div className="complain-btn" ref={container} onClick={handleDropdownClick}
                    onKeyPress={(e) => {
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
            {aboutAsMentor ? 
            <div className="profile__section-content">
                {aboutAsMentor}
            </div> :
            <div className="profile__no-info">
                Пользователь не предоставил информацию о себе
            </div>}
            <div className="profile__section">
                <div className="profile__section-column">
                    <div className="profile__section-label">Контакты</div>
                    {communicationContent(communication)}
                </div>
            </div>
        </div>
    )
}

export default MainInfo;