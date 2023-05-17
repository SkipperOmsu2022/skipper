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
import "./reviewForm.scss"

const ReviewForm = observer(({mentor}) => {
    const {loading, error, response, clearResponse, postFeedback, getUserFeedback, deleteUserFeedback} = useFeedbackService();
    const { auth: userId } = useAuthContext();

    useEffect(() => {
        clearResponse();
        reviewFormStore.setError("")
        
        getUserFeedback(mentor.userId, userId)
            .then(res => reviewFormStore.setReview(res))
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

            if (reviewFormStore.alreadyLeftAReview)
                await deleteUserFeedback(mentor.userId, userId)

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
    console.log(reviewFormStore)
    if (reviewFormStore.success) return (<SuccessMessage/>)
    return (
        <Modal
            showModal={reviewFormStore.modal}
            onModalClose={() => reviewFormStore.setModal(false)}
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
                </div>
            </div>
        </Modal>
    )
})

const SuccessMessage = observer(() => {
    return (
        <Modal
            showModal={reviewFormStore.modal}
            onModalClose={() => reviewFormStore.setModal(false)}
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
    if (error || reviewFormStore.error)
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
})

export default ReviewForm;