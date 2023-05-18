import { useEffect, useState, useRef } from "react"
import { observer } from "mobx-react-lite";

import useFeedbackService from "../../services/feedbackService";
import reviewsListStore from '../../store/reviewsListStore';
import reviewFormStore from "../../store/reviewFormStore";
import PaginatedItems from "../PaginatedItems/PaginatedItems";
import useAuthContext from '../../hooks/useAuthContext';
import Modal from "../Modal/Modal";
import StarsRating from '../StarsRating/StarsRating';
import Spinner from "../../shared/spinner/Spinner";
import ReviewForm from "../ReviewForm/ReviewForm";

import { getMonth } from '../../utils/getDate'
import enviroments from "../../config/enviroments";
import { Link } from 'react-router-dom';

import photo from "../../resources/profile-photo.jpg"
import arrow from "../../resources/icons/arrow.svg"
import menu from "../../resources/icons/menu.svg"
import close from "../../resources/icons/close.svg"

import './reviewsModal.scss'

const ReviewsModal = observer(({mentor}) => {
    const {loading, error, clearResponse, getFeedback} = useFeedbackService();
    const {auth: userId} = useAuthContext();

    useEffect(() => {
        updateReviews(0, 0);

        return () => {
            reviewsListStore.resetStore();
            clearResponse();
        };
    }, []);

    const updateReviews = async (offset, displayStart) => {
        let dto = {
            userId: mentor.userId,
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
                    <div className="review-modal-body" id="review-modal-body">
                        {loading &&
                        <div className="spinner-wrapper">
                            <Spinner className="reviews-margin"/>
                        </div>
                        }
                        <ReviewsList userId={userId} hide={loading ? 'hide' : ""}/>
                        <DeleteFeedbackAlert
                            onModalClose={() => reviewsListStore.setReviewIdToDelete(null)}
                            userAuthorId={reviewsListStore.reviewIdToDelete}
                            mentorId={mentor.userId}
                        />
                        <ReviewForm mentor={mentor} deep={"deep"}/>
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
                        parentId="review-modal-body"
                    />
                </div>
            </div>
		</Modal>
    )
})

const ReviewsList = observer(({userId, hide}) => {
    return reviewsListStore.reviews.slice(reviewsListStore.displayStart, reviewsListStore.displayStart + 6).map((item) => {
        const imageUserResource = item.imageUserResource ? `${enviroments.apiBase}${item.imageUserResource}` : photo;
    
        const date = item.createAt?.split('-')
        const month = getMonth(date[1]);
        const day = +date[2]
        const year = date[0]
        
        return (
            <>
                <div className={`review ${hide}`} key={`mod${item.userAuthorId}`}>
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
                        <MenuButton userAuthorId={+item.userAuthorId} userId={+userId}/>
                    </div>
                    <div className="review-content">
                        {item.text}
                    </div>
                </div>
                <div className={`divider ${hide}`} key={`div${item.userAuthorId}`}></div>
            </>
        )}
    )
})

const MenuButton = observer(({userAuthorId, userId}) => {
    if (userAuthorId !== userId) return null;

    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    const container = useRef();
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        
        return () => document.removeEventListener("click",  handleClickOutside);
    }, []);

    const handleDropdownClick = () => setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownDisplay(false);
        }
    };

    const onDelete = () => {
        reviewsListStore.setReviewIdToDelete(userAuthorId)
        handleDropdownClick()
    }

    return (
        <div className="menu-button" ref={container}>
            <img
                src={menu}
                alt="menu"
                className="menu-button__icon"
                onClick={handleDropdownClick}
            />
            <div className={`menu-button__dropdown ${dropdownDisplay ? "" : 'hide'}`}>
                <div
                    className="menu-button__dropdown-item"
                    onClick={onDelete}
                >
                    Удалить
                </div>
                <div className="menu-button__dropdown-item"
                    onClick={() => reviewFormStore.setModal(true)}
                >
                    Редактировать
                </div>
            </div>
        </div>
    )
})

const DeleteFeedbackAlert = ({onModalClose, userAuthorId, mentorId}) => {
    const {loading, error, clearResponse, deleteUserFeedback} = useFeedbackService();

    useEffect(() => {
        clearResponse();
    })

    const onDelete = async () => {
        const res = await deleteUserFeedback(mentorId, userAuthorId)
        if (res === 200) onModalClose();
    }

    return (
        <Modal
            showModal={userAuthorId}
            onModalClose={onModalClose}
            deep="deep"
        >
            <div className="app-section modal-alert">
                <img
                    className="modal-alert__close-icon"
                    src={close}
                    alt="close"
                    onClick={onModalClose}
                />
                <div className="modal-alert__header pdg-top-16px">
                    Вы точно хотите удалить отзыв?
                </div>
                {loading ? <Spinner/> :
                <div className="modal-alert__bottom-buttons">
                    <button 
                        className="modal-alert__button narrow button pale"
                        onClick={onModalClose}
                    >
                        Отмена
                    </button>
                    <button 
                        className="modal-alert__button narrow button"
                        onClick={onDelete}
                    >
                        Удалить
                    </button>
                </div>}
            </div>
        </Modal>
    )
}

export default ReviewsModal;