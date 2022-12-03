import "../../../shared/submitButton/button.scss"

const AdditionalInfo = () => {

    return (
        <div className="app-section profile additional-info">
            <div className="main-block">
                <div className="stars-rating">
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9733;
                    </div>
                    <div className="star">
                        &#9734;
                    </div>
                    <span className="grade" >4,0</span>
                </div>
                <div className="main-block__section">
                    <span>45 студентов</span>
                    <span>248 занятий</span>
                </div>
                <div className="main-block__section">
                    <span>На Skipper c 20 мая<br/>2020 года</span>
                </div>
            </div>
            <div className="profile__btn-block full-width">
                <span className="profile__btn-block-name">Консультация:</span>
                <button className="button">Забронировать</button>
                <button className="button">Написать сообщение</button>
            </div>
        </div>
    )
}

export default AdditionalInfo;