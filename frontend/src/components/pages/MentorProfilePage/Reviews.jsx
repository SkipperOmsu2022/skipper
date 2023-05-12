import ReactPaginate from 'react-paginate';
import { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";

import mentorReviewsStore from '../../../store/mentorReviewsStore';
import Modal from "../../Modal/Modal";

import photo from "../../../resources/profile-photo.jpg"
import filledStar from "../../../resources/icons/filled-star.svg"
import emptyStar from "../../../resources/icons/empty-star.svg"
import arrow from "../../../resources/icons/arrow.svg"
import "../../../shared/submitButton/button.scss"
import "../../../shared/close-icon.scss"


const Reviews = observer(() => {
    return (
        <div className="app-section profile huge-column">
            <ReviewsModal/>
            <div className="main-block btm-gradient">
                <div className="profile__header">
                    Отзывы
                    <div className="reviews-amount">10 отзывов</div>
                </div>
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-additional-info">
                                <div className="stars-rating">
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={emptyStar} alt="" />
                                </div>
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
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-additional-info">
                                <div className="stars-rating">
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={emptyStar} alt="" />
                                </div>
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
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-additional-info">
                                <div className="stars-rating">
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={emptyStar} alt="" />
                                </div>
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
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-additional-info">
                                <div className="stars-rating">
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={emptyStar} alt="" />
                                </div>
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
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-additional-info">
                                <div className="stars-rating">
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={emptyStar} alt="" />
                                </div>
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
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-additional-info">
                                <div className="stars-rating">
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={filledStar} alt="" />
                                    <img className="star-icon" src={emptyStar} alt="" />
                                </div>
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
            </div>
                {/* <div className="no-reviews">
                    Отзывов нет
                </div> */}
            <div className="profile__btn-block full-width">
                <button 
                    className="button"
                    onClick={() => mentorReviewsStore.setModal(true)}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            mentorReviewsStore.setModal(true);
                        }
                    }}
                >
                    Смотреть все отзывы
                </button>
            </div>
        </div>
    )
})

const ReviewsModal = observer(() => {
    const ref = useRef(null);
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            mentorReviewsStore.setModal(false);
        }
    };

    return (
        <Modal
			showModal={mentorReviewsStore.modal}
			onModalClose={() => mentorReviewsStore.setModal(false)}
		>
			<div className="app-section review-modal" ref={ref}>
                <div className="review-modal-header">
                    <img
                        src={arrow}
                        alt="arrow"
                        className="arrow-icon"
                        onClick={() => mentorReviewsStore.setModal(false)}
                    />
                    <div className="review-modal-header__divider"></div>
                    <div className="review-modal-header__text">ВСЕ ОТЗЫВЫ</div>
                    <div className="review-modal-header__divider"></div>
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
                    <img src={photo} alt="user" className="review-header__photo"/>
                    <div className="review-header__info">
                        <div className="review-header__info-user-name">
                            Азамат Имаев
                        </div>
                        <div className="stars-rating">
                            <img className="star-icon" src={filledStar} alt="" />
                            <img className="star-icon" src={filledStar} alt="" />
                            <img className="star-icon" src={filledStar} alt="" />
                            <img className="star-icon" src={filledStar} alt="" />
                            <img className="star-icon" src={emptyStar} alt="" />
                        </div>
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