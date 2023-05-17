import { useEffect } from "react"
import { useParams } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

import useFeedbackService from "../../../services/feedbackService";
import reviewsListStore from '../../../store/reviewsListStore';
import ReviewsModal from "../../ReviewsModal/ReviewsModal";
import StarsRating from '../../StarsRating/StarsRating';
import { getMonthShort } from '../../../utils/getDate'
import enviroments from "../../../config/enviroments";
import Spinner from "../../../shared/spinner/Spinner";

import photo from "../../../resources/profile-photo.jpg"
import "../../../shared/submitButton/button.scss"
import "../../../shared/arrow-icon.scss"

const Reviews = observer(() => {
    const {loading, getFeedback} = useFeedbackService();
    const {userId : mentorId} = useParams();

    useEffect(() => {
        updateReviews();

        return () => reviewsListStore.resetStore();
    }, []);

    const updateReviews = async () => {
        let dto = {
            userId: mentorId,
            offset: 0,
            limit: 15
        }
        await getFeedback(dto)
            .then(res => reviewsListStore.setFirstReviews(res))
    }

    return (
        <div className="app-section profile huge-column">
            <ReviewsModal mentorId={mentorId}/>
            <div className="main-block btm-gradient">
                <div className="profile__header">
                    Отзывы
                    <div className="reviews-amount">{reviewsListStore.totalElement} отзывов</div>
                </div>
                {loading ? <Spinner/> : <ReviewsShort/>}
                { reviewsListStore.totalElement === 0 ?
                <div className="no-reviews">
                    Отзывов нет
                </div> : null }
            </div>
            <div className="profile__btn-block full-width">
                <button 
                    className={`button ${reviewsListStore.totalElement === 0 ? "inactive" : ""}`}
                    onClick={() => reviewsListStore.setModal(true)}
                    disabled={reviewsListStore.totalElement === 0}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            reviewsListStore.setModal(true);
                        }
                    }}
                >
                    Смотреть все отзывы
                </button>
            </div>
        </div>
    )
})

const ReviewsShort = observer(() => {
    return reviewsListStore.firstReviews.map((item) => {
        const imageUserResource = item.imageUserResource ? `${enviroments.apiBase}${item.imageUserResource}` : photo;

        const date = item.createAt?.split('-')
        const month = getMonthShort(date[1]);
        const day = +date[2]
        const year = date[0]

        return (
        <div className="review" key={item.userAuthorId}>
            <div className="review__user">
                <Link
                    className="review__user-photo"
                    to={`/profile/${item.userAuthorId}`}
                >
                    <img className="review__user-photo user-photo" src={imageUserResource} alt="" />
                </Link>
                <div className="review__user-info">
                    <Link
                        className="review__user-name"
                        to={`/profile/${item.userAuthorId}`}
                    >
                        {item.firstName} {item.lastName}
                    </Link>
                    <div className="review__user-additional-info">
                        <StarsRating rating={item.rating}/>
                        <div className="review__user-additional-info-date">
                            {day} {month} {year}
                        </div>
                    </div>
                </div>
            </div>
            <div className="review__content">
                {item.text}
            </div>
        </div>
    )})
})

export default Reviews;