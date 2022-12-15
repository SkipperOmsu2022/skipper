import enviroments from "../../../config/enviroments";

import "./profilePage.scss"
import { useEffect, useState, useRef } from "react"
import { useParams, Link } from 'react-router-dom';
import photo from "../../../resources/profile-photo.jpg"
import "../../../shared/submitButton/button.scss"
import useProfileService from "../../../services/profileService";
import DateOfRegistration from "./DateOfRegistration";
import CommunicationContent from "./CommunicationContent";

const ProfilePage = () => {
    const {getUserData} = useProfileService();
    const {userId} = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [mentorStatus, setMentorStatus] = useState(false);
    const [specialization, setSpecialization] = useState("");
    const [imageUserResource, setImageUserResource] = useState("");
    const [dateOfRegistration, setDateOfRegistration] = useState([]);
    const [communication, setCommunication] = useState([]);

    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    const container = useRef();

    useEffect(() => {
        getUserData('user/profile/', userId)
            .then(res => {
                console.log(res?.data?.mentorSpecializations)
                setFirstName(res?.data?.firstName);
                setLastName(res?.data?.lastName);
                setAboutMe(res?.data?.aboutMe);
                setSpecialization(res?.data?.mentorSpecializations)
                setMentorStatus(res?.data?.isEnabledMentorStatus)
                setImageUserResource(res?.data?.imageUserResource)
                setDateOfRegistration(res?.data?.dateOfRegistration?.split('-'))

                setCommunication([
                    {name: 'Вконтакте', link: res?.data?.linkVk},
                    {name: 'Skype', link: res?.data?.linkSkype},
                    {name: 'Discord', link: res?.data?.linkDiscord},
                    {name: 'Telegram', link: res?.data?.linkTelegram}
                ])
            })

        document.addEventListener("click", handleClickOutside);
        
        return () => document.removeEventListener("click",  handleClickOutside);
    }, []);

    const handleDropdownClick = () => setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownDisplay(false);
        }
    };

    const dropdown = `dropdown ${dropdownDisplay ? '' : 'hide'}`;

    return (
        <div className="page-content">
            <div className="app-section-header">Профиль</div>
            <div className="app-section profile">
                <div className="profile__section">
                    <div className="profile__section-row">
                        <img
                            className="profile__photo"
                            src={imageUserResource ? `${enviroments.apiBase}${imageUserResource}` : photo}
                            alt="" />
                        <div className="profile__main-info">
                            <div className="name">{firstName} {lastName}</div>
                            <div className="specialty">{specialization}</div>
                        </div>
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
                {aboutMe ? 
                <div className="profile__section-content">
                    {aboutMe}
                </div> : 
                <div className="profile__no-info">
                    Пользователь не предоставил информацию о себе
                </div>
                }
                <div className="profile__section">
                    <CommunicationContent communication={communication}/>
                    <div className="profile__section-column gap40px">
                        <div className="profile__registration-date">
                            <DateOfRegistration date={dateOfRegistration}/>
                        </div>  
                        <div className="profile__btn-block">
                            {mentorStatus ? 
                            <Link
                                to={`/profile-mentor/${userId}`}
                                className="button"
                            >
                                Перейти на профиль ментора
                            </Link>
                            : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;