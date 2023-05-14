import { observer } from "mobx-react-lite";

import Modal from "../Modal/Modal";
import reviewFormStore from "../../store/reviewFormStore";
import { StarsRatingInput } from "../StarsRating/StarsRating";
import Spinner from "../../shared/spinner/Spinner"

import photo from "../../resources/profile-photo.jpg"
import arrow from "../../resources/icons/arrow.svg"
import close from "../../resources/icons/close.svg"
import "./reviewForm.scss"

const ReviewForm = observer(() => {
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
                        <img src={photo} alt="user" className="review-form__mentor-photo user-photo"/>
                        <div className="review-form__mentor-info">
                            <div className="name">Имя Фамилия</div>
                            <div className="specialty">Специальность</div>
                        </div>
                    </div>
                    <div className="review-form__rate">
                        <div className="review-form__rate-title">
                            Оцените ментора:
                        </div>
                        <StarsRatingInput
                            rating={reviewFormStore.rating}
                            setRating={reviewFormStore.setRating}
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
                        {false ? <Spinner className='no-margin'/> : 
                            <>
                                <button
                                    className="review-form__footer-button button pale"
                                    onClick={() => reviewFormStore.resetStore()}
                                >
                                    Отменить
                                </button>
                                <button
                                    className="review-form__footer-button button"
                                    onClick={() => reviewFormStore.submit()}
                                >
                                    Отправить
                                </button>
                            </>
                        }
                    </div>
                    <ErrorMessage error={false}/>
                </div>
            </div>
        </Modal>
    )
})

const SuccessMessage = observer(() => {
    return (
        <Modal
            showModal={reviewFormStore.modal}
            onModalClose={() => reviewFormStore.resetStore()}
        >
            <div className="app-section success-message">
                <img
                    className="success-message__close-icon"
                    src={close}
                    alt="close"
                    onClick={() => reviewFormStore.resetStore()}
                />
                <div className="success-message__header">Спасибо!</div>
                <div className="success-message__content">Отзыв скоро будет опубликован</div>
                <button 
                    className="success-message__button button"
                    onClick={() => reviewFormStore.resetStore()}
                >
                    Закрыть
                </button>
            </div>
        </Modal>
    )
})

const ErrorMessage = ({error}) => {
    if (error)
    return (
        <div className="review-form__error">
            <div className="review-form__error-msg">
                Не получилось отправить, попробуйте еще раз через некоторое время
            </div>
            <div className="review-form__error-sign">
                !
            </div>
        </div>
    )
}

export default ReviewForm;