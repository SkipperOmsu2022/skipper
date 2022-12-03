import { useEffect } from "react"

import "./mentorProfilePage.scss"
import "../ProfilePage/profilePage.scss"
import useProfileService from "../../../services/profileService";
import MainInfo from "./MainInfo"
import AdditionalInfo from "./AdditionalInfo"
import Resume from "./Resume"
import Reviews from "./Reviews"
import Lessons from "./Lessons"

const MentorProfilePage = ({mentor}) => {
    const {getUserData} = useProfileService();
    
    useEffect(() => {
        getUserData('user/profile/settings/mentor/')
            .then(res => {
                // setMentor(res?.data?.isEnabledMentorStatus);
                // setAboutMe(res?.data?.aboutMeAsMentor);
                // setQualification(res?.data?.specialization);
            });
    }, []);

    return (
        <div className="page-content">
            <div className="app-section-header"> 
                <span className="inactive" >Профиль |&nbsp;</span>
                Профиль ментора
            </div>
            <div className="profile-wrapper">
                <MainInfo/>
                <AdditionalInfo/>
                <Resume/>
                <Reviews/>
                <Lessons/>
            </div>
        </div>
    )
}

export default MentorProfilePage;