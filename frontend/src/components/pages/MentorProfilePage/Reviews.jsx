import { useEffect } from "react"
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

import useFeedbackService from "../../../services/feedbackService";
import reviewsListStore from '../../../store/reviewsListStore';
import Modal from "../../Modal/Modal";
import StarsRating from '../../StarsRating/StarsRating';
import { getMonthShort, getMonth } from '../../../utils/getDate'
import enviroments from "../../../config/enviroments";
import Spinner from "../../../shared/spinner/Spinner";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";

import photo from "../../../resources/profile-photo.jpg"
import arrow from "../../../resources/icons/arrow.svg"
import "../../../shared/submitButton/button.scss"
import "../../../shared/arrow-icon.scss"

const Reviews = observer(() => {
    const {loading, error, clearResponse, getFeedback} = useFeedbackService();
    const {userId} = useParams();

    useEffect(() => {
        updateReviews();

        return () => reviewsListStore.resetStore();
    }, []);

    const updateReviews = async () => {
        let dto = {
            userId: userId,
            offset: 0,
            limit: 15
        }
        await getFeedback(dto)
            .then(res => reviewsListStore.setFirstReviews(res))
    }

    return (
        <div className="app-section profile huge-column">
            <ReviewsModal/>
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
    return reviewsListStore.firstReviews.map((item, i) => {
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

const ReviewsModal = observer(() => {
    const {loading, error, clearResponse, getFeedback} = useFeedbackService();
    const {userId} = useParams();

    useEffect(() => {
        updateReviews(0, 0);

        return () => {
            reviewsListStore.resetStore();
            clearResponse();
        };
    }, []);

    const updateReviews = async (offset, displayStart) => {
        let dto = {
            userId: userId,
            offset: offset,
            limit: reviewsListStore.limitPerRequest
        }
        await getFeedback(dto)
            .then(res => reviewsListStore.setReviews(res, offset, displayStart))
    }
    
    return (
        <Modal
			showModal={reviewsListStore.modal}
			onModalClose={() => reviewsListStore.setModal(false)}
		>
			<div className="app-section review-modal">
                <div className="modal__header padding-right">
                    <img
                        src={arrow}
                        alt="arrow"
                        className="arrow-icon"
                        onClick={() => reviewsListStore.setModal(false)}
                    />
                    <div className="modal__header-divider"></div>
                    <div className="modal__header-text">ВСЕ ОТЗЫВЫ</div>
                    <div className="modal__header-divider"></div>
                </div>
                <div className="review-modal-body-wrapper">
                    <div className="review-modal-body">
                        {loading ? <Spinner className="reviews-margin"/> : <ReviewsList/>}
                    </div>
                </div>
                <div className='pagination-wrapper'>
                    <PaginatedItems 
                        updateItems={updateReviews}
                        offset={reviewsListStore.offset}
                        updateDisplayStart={reviewsListStore.updateDisplayStart}
                        length={reviewsListStore.reviews.length}
                        displayStart={reviewsListStore.displayStart}
                        pageCount={reviewsListStore.pageCount}
                        itemsPerPage={reviewsListStore.itemsPerPage}
                        limitPerRequest={reviewsListStore.limitPerRequest}
                    />
                </div>
            </div>
		</Modal>
    )
})

const ReviewsList = observer(() => {
    return reviewsListStore.reviews.slice(reviewsListStore.displayStart, reviewsListStore.displayStart + 6).map((item) => {
        const imageUserResource = item.imageUserResource ? `${enviroments.apiBase}${item.imageUserResource}` : photo;
    
        const date = item.createAt?.split('-')
        const month = getMonth(date[1]);
        const day = +date[2]
        const year = date[0]
        
        return (
            <>
                <div className="review" key={`mod${item.userAuthorId}`}>
                    <div className="review-header">
                        <Link
                            className="review-header__photo"
                            to={`/profile/${item.userAuthorId}`}
                        >
                            <img src={imageUserResource} alt="user" className="review-header__photo user-photo"/>
                        </Link>
                        <div className="review-header__info">
                            <Link
                                className="review-header__info-user-name"
                                to={`/profile/${item.userAuthorId}`}
                            >
                                {item.firstName} {item.lastName}
                            </Link>
                            <StarsRating rating={item.rating}/>
                        </div>
                        <div className="review-header__date">
                            {day} {month} {year}
                        </div>
                    </div>
                    <div className="review-content">
                        {item.text}
                    </div>
                </div>
                <div className="divider" key={`div${item.userAuthorId}`}></div>
            </>
        )}
    )
})

export default Reviews;