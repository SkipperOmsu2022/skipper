import { useEffect } from "react"
import ReactPaginate from 'react-paginate';
import { observer } from "mobx-react-lite";

import mentorReviewsListStore from '../../../store/mentorReviewsListStore';
import Modal from "../../Modal/Modal";
import StarsRating from '../../StarsRating/StarsRating';

import photo from "../../../resources/profile-photo.jpg"
import arrow from "../../../resources/icons/arrow.svg"
import "../../../shared/submitButton/button.scss"
import "../../../shared/arrow-icon.scss"

const Reviews = observer(() => {
    useEffect(() => {
        return () => mentorReviewsListStore.resetStore();
    }, []);
    return (
        <div className="app-section profile huge-column">
            <ReviewsModal/>
            <div className="main-block btm-gradient">
                <div className="profile__header">
                    Отзывы
                    <div className="reviews-amount">10 отзывов</div>
                </div>
                <ReviewShort/>
                <ReviewShort/>
                <ReviewShort/>
                <ReviewShort/>
                <ReviewShort/>
                <ReviewShort/>
                <ReviewShort/>
                <ReviewShort/>
                <ReviewShort/>
            </div>
                {/* <div className="no-reviews">
                    Отзывов нет
                </div> */}
            <div className="profile__btn-block full-width">
                <button 
                    className="button"
                    onClick={() => mentorReviewsListStore.setModal(true)}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            mentorReviewsListStore.setModal(true);
                        }
                    }}
                >
                    Смотреть все отзывы
                </button>
            </div>
        </div>
    )
})

const ReviewShort = () => {
    return (
        <div className="review">
            <div className="review__user">
                <img className="review__user-photo user-photo" src={photo} alt="" />
                <div className="review__user-info">
                    <div className="review__user-name">
                        Азамат Имаев
                    </div>
                    <div className="review__user-additional-info">
                        <StarsRating rating={4}/>
                        <div className="review__user-additional-info-date">
                            11 Дек 2023
                        </div>
                    </div>
                </div>
            </div>
            <div className="review__content">
                Сергей действительно разбирается в своей области. Всем рекомендую и Сергей действительно разбирается в своей области.
            </div>
        </div>
    )
}

const ReviewsModal = observer(() => {
    return (
        <Modal
			showModal={mentorReviewsListStore.modal}
			onModalClose={() => mentorReviewsListStore.setModal(false)}
		>
			<div className="app-section review-modal">
                <div className="modal__header padding-right">
                    <img
                        src={arrow}
                        alt="arrow"
                        className="arrow-icon"
                        onClick={() => mentorReviewsListStore.setModal(false)}
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