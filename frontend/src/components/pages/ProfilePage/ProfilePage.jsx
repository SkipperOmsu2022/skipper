import "./profilePage.scss"
import { useEffect, useState, useRef } from "react"
import { useParams } from 'react-router-dom';
import photo from "../../../resources/profile-photo.jpg"
import "../../../shared/submitButton/button.scss"
import useProfileService from "../../../services/profileService";
    

const ProfilePage = () => {
    const {getUserData, loading, clearResponse} = useProfileService();
    const {userId} = useParams();

    const [firstName, setFirstName] = useState("Имя");
    const [lastName, setLastName] = useState("Фамилия");
    const [aboutMe, setAboutMe] = useState("");
    const [communication, setCommunication] = useState([]);

    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    const container = useRef();

    useEffect(() => {
        getUserData('', userId)
            .then(res => {
                setFirstName(res?.data?.firstName)
                setLastName(res?.data?.lastName)
                setAboutMe(res?.data?.aboutMe)
            })
        getUserData('contacts/', userId)
            .then(res => {
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

    const communicationContent = () => {
        const links = communication.filter((item) => (item.name && item.link)).map((item, i) => {
            return (
                <div className="profile__contact" key={i}>
                    <div className="profile__contact-label">
                        {item.name}:
                    </div>
                    <div className="profile__contact-link">
                        {item.link}
                    </div>
                </div>
            )
        })
        if (links.length === 0) return (
            <div className="profile__no-info">
                Пользователь не предоставил контакты для связи
            </div>
        )
        return links;
    }

    return (
        <div className="page-content">
            <div className="app-section-name">Профиль</div>
            <div className="app-section profile">
                <div className="profile__section">
                    <div className="profile__section-row">
                        <img className="profile__photo" src={photo} alt="" />
                        <div className="profile__main-info">
                            <div className="name">{firstName} {lastName}</div>
                            <div className="specialty">Специальность ментора</div>
                        </div>
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
                {aboutMe ? 
                <div className="profile__section-content">
                    {aboutMe}
                </div> : 
                <div className="profile__no-info">
                    Пользователь не предоставил информацию о себе
                </div>
                }
                <div className="profile__section">
                    <div className="profile__section-column">
                        <div className="profile__section-label">Контакты</div>
                        {communicationContent()}
                    </div>
                    <div className="profile__btn-block">
                        <button className="button">Написать сообщение</button>
                        <button className="button">Перейти на профиль ментора</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;