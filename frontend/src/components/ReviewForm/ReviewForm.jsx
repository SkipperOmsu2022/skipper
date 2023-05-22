import { useEffect } from "react"
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

import Modal from "../Modal/Modal";
import reviewFormStore from "../../store/reviewFormStore";
import { StarsRatingInput } from "../StarsRating/StarsRating";
import useFeedbackService from "../../services/feedbackService";
import useAuthContext from '../../hooks/useAuthContext';
import Spinner from "../../shared/spinner/Spinner"

import arrow from "../../resources/icons/arrow.svg"
import close from "../../resources/icons/close.svg"
import garbageBin from "../../resources/icons/garbage-bin.svg"
import "./reviewForm.scss"

const ReviewForm = observer(({mentor}) => {
    const {loading, error, response, clearResponse, postFeedback, getUserFeedback, deleteUserFeedback} = useFeedbackService();
    const { auth: userId } = useAuthContext();

    useEffect(() => {
        clearResponse();
        reviewFormStore.setError("")
        
        getUserFeedback(mentor.userId, userId)
            .then(res => {reviewFormStore.setReview(res); console.log(res)})
        return clearResponse;
    }, [])

    const onSubmit = async () => {
        clearResponse();

        if (reviewFormStore.rating !== 0) {
            const data = {
                mentorId: mentor.userId,
                userAuthorId: userId,
                rating: reviewFormStore.rating,
                text: reviewFormStore.feedback
            }
            
            let deleteRes = 200
            if (reviewFormStore.alreadyLeftAReview)
                deleteUserFeedback(mentor.userId, userId)
                    .then(res => {deleteRes = res})
            
            if (deleteRes === 200)
                postFeedback(data)
                    .then(res => {
                        if (res === 200) {
                            clearResponse();
                            reviewFormStore.setSuccess()
                        }
                    })
        } else {
            reviewFormStore.setError("Выберите оценку");
        }
    }
    
    if (reviewFormStore.success) return (<SuccessMessage deep="deep"/>)
    return (
        <Modal
            showModal={reviewFormStore.modal}
            onModalClose={() => reviewFormStore.setModal(false)}
            deep="deep"
        >
            <div className="app-section review-form">
                <div className="modal__header">
                    <img
                        src={arrow}
                        alt="arrow"
                        className="arrow-icon"
                        onClick={() => reviewFormStore.setModal(false)}
                    />
                    <div className="modal__header-divider"></div>
                    <div className="modal__header-text">
                        {reviewFormStore.alreadyLeftAReview ? "РЕДАКТИРОВАНИЕ ОТЗЫВА" : 'НОВЫЙ ОТЗЫВ'}
                    </div>
                    <div className="modal__header-divider"></div>
                </div>
                <div className="review-form-body">
                    <div className="review-form__mentor">
                        <Link className="review-form__mentor-photo" to={`/profile/${mentor.userId}`}>
                            <img src={mentor.imageUserResource} alt="user" className="review-form__mentor-photo user-photo"/>
                        </Link>
                        <div className="review-form__mentor-info">
                            <Link className="name" to={`/profile/${mentor.userId}`}>
                                {mentor.firstName} {mentor.lastName}
                            </Link>
                            <div className="specialty">{mentor.mentorSpecializations}</div>
                        </div>
                        {reviewFormStore.alreadyLeftAReview &&
                            <img 
                                src={garbageBin}
                                alt=""
                                className="garbage-bin menu-button"
                                onClick={() => reviewFormStore.setReviewIdToDelete(userId)}
                            />
                        }
                    </div>
                    <div className="review-form__rate">
                        <div className="review-form__rate-title">
                            Оцените ментора:
                        </div>
                        <StarsRatingInput
                            rating={reviewFormStore.rating}
                            setRating={reviewFormStore.setRating}
                            error={reviewFormStore.error === "Выберите оценку"}
                        />
                    </div>
                    <div className="review-form__feedback">
                        <div className="review-form__feedback-title">
                            Оставьте отзыв о менторе:
                        </div>
                        <div className="input textarea">
                            <textarea
                                className="textarea-input"
                                placeholder="Расскажите, что вам больше всего понравилось или не понравилось"
                                id="aboutMe"
                                maxLength='400'
                                value={reviewFormStore.feedback}
                                onChange={(e) => reviewFormStore.setFeedback(e.target.value)}
                            />
                            <div className="textarea-counter">
                                {reviewFormStore?.feedback?.length}/400
                            </div>
                        </div>
                    </div>
                    <div className="review-form__footer">
                        {loading ? <Spinner className='no-margin'/> : 
                            <>
                                <button
                                    className="review-form__footer-button button pale"
                                    onClick={reviewFormStore.onCancel}
                                >
                                    Отменить
                                </button>
                                <button
                                    className="review-form__footer-button button"
                                    onClick={onSubmit}
                                >
                                    {reviewFormStore.alreadyLeftAReview ? "Сохранить" : 'Отправить'}
                                </button>
                            </>
                        }
                    </div>
                    <ErrorMessage error={error} response={response}/>
                    <DeleteFeedbackAlert
                        onModalClose={() => reviewFormStore.setReviewIdToDelete(null)}
                        onSuccess={reviewFormStore.resetStore}
                        userAuthorId={reviewFormStore.reviewIdToDelete}
                        mentorId={mentor.userId}
                    />
                </div>
            </div>
        </Modal>
    )
})

const DeleteFeedbackAlert = ({onModalClose, onSuccess, userAuthorId, mentorId}) => {
    const {loading, error, clearResponse, deleteUserFeedback} = useFeedbackService();
    
    useEffect(() => {
        clearResponse();
    })

    const onDelete = async () => {
        const res = await deleteUserFeedback(mentorId, userAuthorId)
        if (res === 200) {
            onSuccess();
            onModalClose();
        }
    }

    const content = error ?
    <>
        <div className="modal-alert__header pdg-top-16px error">
            Произошла ошибка. Повторите попытку позже
        </div>
        {loading ? <Spinner/> :
        <div className="modal-alert__bottom-buttons">
            <button 
                className="modal-alert__button button"
                onClick={onModalClose}
            >
                Закрыть
            </button>
        </div>}
    </> :
    <>
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
    </>

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
                {content}
            </div>
        </Modal>
    )
}

const SuccessMessage = observer(({deep}) => {
    return (
        <Modal
            showModal={reviewFormStore.modal}
            onModalClose={() => reviewFormStore.setModal(false)}
            deep={deep}
        >
            <div className="app-section modal-alert">
                <img
                    className="modal-alert__close-icon"
                    src={close}
                    alt="close"
                    onClick={() => reviewFormStore.setModal(false)}
                />
                <div className="modal-alert__header">Спасибо!</div>
                <div className="modal-alert__content">Отзыв скоро будет опубликован</div>
                <button 
                    className="modal-alert__button button"
                    onClick={() => reviewFormStore.setModal(false)}
                >
                    Закрыть
                </button>
            </div>
        </Modal>
    )
})

const ErrorMessage = observer(({error, response}) => {
    if (error || reviewFormStore.error) {
        return (
            <div className="review-form__error">
                <div className="review-form__error-msg">
                    {reviewFormStore.error || response ||
                    <span> 
                        Не удалось отправить, попробуйте<br/>
                        еще раз через некоторое время
                    </span>
                    }
                </div>
                <div className="review-form__error-sign">
                    !
                </div>
            </div>
        )
    } else {
        return null;
    }
})

export default ReviewForm;
export { DeleteFeedbackAlert }