import { useEffect } from "react"
import { observer } from "mobx-react-lite";

import Modal from "../Modal/Modal";
import reviewFormStore from "../../store/reviewFormStore";
import messagesStore from "../../store/messagesStore";
import { StarsRatingInput } from "../StarsRating/StarsRating";
import useFeedbackService from "../../services/feedbackService";
import useAuthContext from '../../hooks/useAuthContext';
import Spinner from "../../shared/spinner/Spinner"

import photo from "../../resources/profile-photo.jpg"
import arrow from "../../resources/icons/arrow.svg"
import close from "../../resources/icons/close.svg"
import "./reviewForm.scss"

const ReviewForm = observer(({mentor}) => {
    const {loading, error, clearResponse, postFeedback} = useFeedbackService();
    const { auth: userId } = useAuthContext();

    useEffect(() => {
        clearResponse();
        reviewFormStore.setError("")
        
        if (reviewFormStore.success) {
            reviewFormStore.resetStore()
        }
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
            const res = await postFeedback(data)

            if (res === 200) {
                clearResponse();
                reviewFormStore.setSuccess()
            }
        } else {
            reviewFormStore.setError("Выберите оценку");
        }
    }
    
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
                    <div className="modal__header-text">НОВЫЙ ОТЗЫВ</div>
                    <div className="modal__header-divider"></div>
                </div>
                <div className="review-form-body">
                    <div className="review-form__mentor">
                        <img src={mentor.imageUserResource} alt="user" className="review-form__mentor-photo user-photo"/>
                        <div className="review-form__mentor-info">
                            <div className="name">{mentor.firstName} {mentor.lastName}</div>
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
                                {reviewFormStore.feedback.length}/400
                            </div>
                        </div>
                    </div>
                    <div className="review-form__footer">
                        {loading ? <Spinner className='no-margin'/> : 
                            <>
                                <button
                                    className="review-form__footer-button button pale"
                                    onClick={reviewFormStore.resetStore}
                                >
                                    Отменить
                                </button>
                                <button
                                    className="review-form__footer-button button"
                                    onClick={onSubmit}
                                >
                                    Отправить
                                </button>
                            </>
                        }
                    </div>
                    <ErrorMessage error={error}/>
                </div>
            </div>
        </Modal>
    )
})

const SuccessMessage = observer(() => {
    return (
        <Modal
            showModal={reviewFormStore.modal}
            onModalClose={reviewFormStore.resetStore}
        >
            <div className="app-section success-message">
                <img
                    className="success-message__close-icon"
                    src={close}
                    alt="close"
                    onClick={reviewFormStore.resetStore}
                />
                <div className="success-message__header">Спасибо!</div>
                <div className="success-message__content">Отзыв скоро будет опубликован</div>
                <button 
                    className="success-message__button button"
                    onClick={reviewFormStore.resetStore}
                >
                    Закрыть
                </button>
            </div>
        </Modal>
    )
})

const ErrorMessage = observer(({error}) => {
    if (error || reviewFormStore.error)
    return (
        <div className="review-form__error">
            <div className="review-form__error-msg">
                {reviewFormStore.error ||
                <span> 
                    Не получилось отправить,<br/>
                    попробуйте еще раз<br/>
                    через некоторое время
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