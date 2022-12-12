import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react"

import "./mentorProfilePage.scss"
import "../ProfilePage/profilePage.scss"
import useProfileService from "../../../services/profileService";
import MainInfo from "./MainInfo"
import AdditionalInfo from "./AdditionalInfo"
import Resume from "./Resume"
import Reviews from "./Reviews"
import Lessons from "./Lessons"

const MentorProfilePage = () => {
    const {getUserData} = useProfileService();
    const {userId} = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [aboutAsMentor, setAboutAsMentor] = useState("");
    const [mentorStatus, setMentorStatus] = useState(false);
    const [imageUserResource, setImageUserResource] = useState("");
    const [dateOfRegistration, setDateOfRegistration] = useState([]);
    const [mentorSpecializations, setMentorSpecializations] = useState("");
    const [communication, setCommunication] = useState([]);

    useEffect(() => {
        getUserData('user/profile/mentor/', userId)
            .then(res => {
                setFirstName(res?.data?.firstName);
                setLastName(res?.data?.lastName);
                setAboutAsMentor(res?.data?.aboutAsMentor);
                setMentorSpecializations(res?.data?.mentorSpecializations)
                setDateOfRegistration(res?.data?.dateOfRegistration?.split('-'))
                setMentorStatus(res?.data?.isEnabledMentorStatus)
                setImageUserResource(res?.data?.imageUserResource)

                setCommunication([
                    {name: 'Вконтакте', link: res?.data?.linkVk},
                    {name: 'Skype', link: res?.data?.linkSkype},
                    {name: 'Discord', link: res?.data?.linkDiscord},
                    {name: 'Telegram', link: res?.data?.linkTelegram}
                ])
            })
    }, []);

    const isOwner = userId === localStorage.getItem('logged');

    return (
        <div className="page-content">
            <div className="app-section-header"> 
                <Link 
                    to={`/profile/${userId}`}
                    className="inactive"
                >
                    Профиль |&nbsp;
                </Link>
                Профиль ментора
            </div>
            <div className="profile-wrapper">
                <MainInfo props={{firstName, lastName, mentorSpecializations, aboutAsMentor, communication, imageUserResource}}/>
                <AdditionalInfo props={{dateOfRegistration, mentorStatus, isOwner}}/>
                <Resume/>
                <Reviews/>
                <Lessons/>
            </div>
        </div>
    )
}

export default MentorProfilePage;