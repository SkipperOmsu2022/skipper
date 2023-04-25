import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite";

import "./mentorProfilePage.scss"
import "../ProfilePage/profilePage.scss"
import useProfileService from "../../../services/profileService";
import MainInfo from "./MainInfo"
import AdditionalInfo from "./AdditionalInfo"
import Resume from "./Resume"
import Reviews from "./Reviews"
import Lessons from "./Lessons"

import mentorProfileStore from '../../../store/mentorProfileStore';

const MentorProfilePage = observer(() => {
    const {getUserData} = useProfileService();
    const {userId} = useParams();

    useEffect(() => {
        getUserData('user/profile/mentor/', userId)
            .then(res => mentorProfileStore.setMentorData(res))
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
                <MainInfo/>
                <AdditionalInfo isOwner={isOwner} userId={userId}/>
                <Resume/>
                <Reviews/>
                <Lessons/>
            </div>
        </div>
    )
})

export default MentorProfilePage;