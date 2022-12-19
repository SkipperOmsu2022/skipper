import photo from "../../../resources/profile-photo.jpg"
import "../../../shared/submitButton/button.scss"

const Reviews = () => {
    return (
        <div className="app-section profile huge-column not-working">
            <div className="main-block">
                <div className="profile__header">Отзывы</div>
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-lessons">
                                4 урока
                            </div>
                        </div>
                    </div>
                    <div className="review__content">
                        Сергей действительно разбирается в своей области. Всем рекомендую и...
                    </div>
                </div>
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-lessons">
                                4 урока
                            </div>
                        </div>
                    </div>
                    <div className="review__content">
                        Сергей действительно разбирается в своей области. Всем рекомендую и...
                    </div>
                </div>
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-lessons">
                                4 урока
                            </div>
                        </div>
                    </div>
                    <div className="review__content">
                        Сергей действительно разбирается в своей области. Всем рекомендую и...
                    </div>
                </div>
                <div className="review">
                    <div className="review__user">
                        <img className="review__user-photo" src={photo} alt="" />
                        <div className="review__user-info">
                            <div className="review__user-name">
                                Азамат Имаев
                            </div>
                            <div className="review__user-lessons">
                                4 урока
                            </div>
                        </div>
                    </div>
                    <div className="review__content">
                        Сергей действительно разбирается в своей области. Всем рекомендую и...
                    </div>
                </div>
            </div>
            <div className="profile__btn-block full-width">
                <button className="button inactive" disabled>Смотреть все отзывы</button>
            </div>
        </div>
    )
}

export default Reviews;