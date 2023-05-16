import { useEffect } from "react"
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { observer } from "mobx-react-lite";

import useFeedbackService from "../../../services/feedbackService";
import reviewsListStore from '../../../store/reviewsListStore';
import Modal from "../../Modal/Modal";
import StarsRating from '../../StarsRating/StarsRating';
import { getMonthShort } from '../../../utils/getDate'

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
                <ReviewsShort/>
            </div>
                { reviewsListStore.totalElement === 0 ?
                <div className="no-reviews">
                    Отзывов нет
                </div> : null }
            <div className="profile__btn-block full-width">
                <button 
                    className="button"
                    onClick={() => reviewsListStore.setModal(true)}
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
        const date = item.createAt?.split('-')
        const month = getMonthShort(date[1]);
        const day = +date[2]
        const year = date[0]

        return (
        <div className="review" key={item.userAuthorId}>
            <div className="review__user">
                <img className="review__user-photo user-photo" src={photo} alt="" />
                <div className="review__user-info">
                    <div className="review__user-name">
                        Азамат Имаев
                    </div>
                    <div className="review__user-additional-info">
                        <StarsRating rating={item.rating}/>
                        <div className="review__user-additional-info-date">
                            {`${day} ${month} ${year}`}
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
                        <Review/>
                        <Review/>
                        <Review/>
                        <Review/>
                        <Review/>
                    </div>
                </div>
                <div className='pagination-wrapper'>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={() => {}}
                        forcePage={1}
                        pageRangeDisplayed={6}
                        marginPagesDisplayed={0}
                        pageCount={60}
                        previousLabel="<"
                        breakLabel={null}
                        renderOnZeroPageCount={null}

                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        pageClassName="page-item"
                        activeClassName="active-link"
                        pageLinkClassName="page-link"
                        containerClassName="pagination"
                    />
                </div>
            </div>
		</Modal>
    )
})

const Review = () => {
    return (
        <>
            <div className="review">
                <div className="review-header">
                    <img src={photo} alt="user" className="review-header__photo user-photo"/>
                    <div className="review-header__info">
                        <div className="review-header__info-user-name">
                            Азамат Имаев
                        </div>
                        <StarsRating rating={4}/>
                    </div>
                    <div className="review-header__date">
                        11 Мая 2023
                    </div>
                </div>
                <div className="review-content">
                    Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве. Готов помочь с вопросами составления отчетности и прочих бухгалтерских делишек. Также неплохо готовлю и говорю на иврите. Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве. Готов помочь с вопросами составления отчетности и прочих бухгалтерских делишек.
                </div>
            </div>
            <div className="divider"></div>
        </>
    )
}

export default Reviews;