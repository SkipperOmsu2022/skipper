import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"

import "./mentorProfilePage.scss"
import "../ProfilePage/profilePage.scss"
import useProfileService from "../../../services/profileService";
import MainInfo from "./MainInfo"
import AdditionalInfo from "./AdditionalInfo"
import Resume from "./Resume"
import Reviews from "./Reviews"
import Lessons from "./Lessons"

//
import useSpecializationService from "../../../services/SpecializationService";
//

const MentorProfilePage = () => {
    //
    const {getSpecializationsList} = useSpecializationService();
    //
    const {getUserData} = useProfileService();
    const {userId} = useParams();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [aboutAsMentor, setAboutAsMentor] = useState("");
    const [mentorStatus, setMentorStatus] = useState(false);
    const [dateOfRegistration, setDateOfRegistration] = useState(false);
    const [mentorSpecializations, setMentorSpecializations] = useState("");
    const [communication, setCommunication] = useState([]);

    useEffect(() => {
        let tmp;
        getSpecializationsList()
            .then(res => {
                tmp = res;
            })
            .then(() => {
                getUserData('user/profile/mentor/', userId)
                    .then(res => {
                        setFirstName(res?.data?.firstName);
                        setLastName(res?.data?.lastName);
                        setAboutAsMentor(res?.data?.aboutAsMentor);
                        setMentorSpecializations(res?.data?.mentorSpecializations?.map((item) => 
                            tmp.find(option => option.value === item)).map((item) => item.label).join(', '))
                        setDateOfRegistration(res?.data?.dateOfRegistration?.split('-'))
                        setMentorStatus(res?.data?.isEnabledMentorStatus)

                        setCommunication([
                            {name: 'Вконтакте', link: res?.data?.linkVk},
                            {name: 'Skype', link: res?.data?.linkSkype},
                            {name: 'Discord', link: res?.data?.linkDiscord},
                            {name: 'Telegram', link: res?.data?.linkTelegram}
                        ])
                    })
            })
    }, []);

    return (
        <div className="page-content">
            <div className="app-section-header"> 
                <span className="inactive" >Профиль |&nbsp;</span>
                Профиль ментора
            </div>
            <div className="profile-wrapper">
                <MainInfo props={{firstName, lastName, mentorSpecializations, aboutAsMentor, communication}}/>
                <AdditionalInfo props={{dateOfRegistration, mentorStatus}}/>
                <Resume/>
                <Reviews/>
                <Lessons/>
            </div>
        </div>
    )
}

export default MentorProfilePage;