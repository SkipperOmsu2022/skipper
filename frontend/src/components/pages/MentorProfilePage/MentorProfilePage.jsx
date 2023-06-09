import { useParams, Link } from 'react-router-dom';
import { useEffect } from "react"
import { observer } from "mobx-react-lite";

import "./mentorProfilePage.scss"
import "../ProfilePage/profilePage.scss"
import useAuthContext from '../../../hooks/useAuthContext';
import useProfileService from "../../../services/profileService";
import { api } from '../../../services/api';
import MainInfo from "./MainInfo"
import AdditionalInfo from "./AdditionalInfo"
import Resume from "./Resume"
import Reviews from "./Reviews"
import Lessons from "./Lessons"

import mentorProfileStore from '../../../store/mentorProfileStore';

const MentorProfilePage = observer(() => {
    const {getUserData} = useProfileService();
    const {userId: mentorId} = useParams();
    const { auth: currentUserId } = useAuthContext();

    useEffect(() => {
        if (currentUserId) {
            getUserData(api.mentorProfile, mentorId, {mentorId: mentorId, userId: currentUserId})
                .then(res => mentorProfileStore.setMentorData(res, mentorId))
        } else {
            getUserData(api.mentorProfile, mentorId, {mentorId: mentorId})
                .then(res => mentorProfileStore.setMentorData(res, mentorId))
        }

        return mentorProfileStore.resetStore;
    }, []);

    const isOwner = mentorId === currentUserId;

    return (
        <div className="page-content">
            <div className="app-section-header"> 
                <Link 
                    to={`/profile/${mentorId}`}
                    className="inactive"
                >
                    Профиль |&nbsp;
                </Link>
                Профиль ментора
            </div>
            <div className="profile-wrapper">
                <MainInfo mentorId={mentorId} currentUserId={currentUserId}/>
                <AdditionalInfo isOwner={isOwner} mentorId={mentorId}/>
                <Resume/>
                <Reviews/>
                <Lessons/>
            </div>
        </div>
    )
})

export default MentorProfilePage;