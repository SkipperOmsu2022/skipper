const Lessons = () => {
    return (
        <div className="app-section profile mentor">
            <div className="profile__header">Занятия</div>
            <div className="profile__lessons">
                <div className="profile__lessons-row">
                    <div className="profile__lessons-header">Вид занятия</div>
                    <div className="profile__lessons-header">Стоимость</div>
                </div>
                <div className="profile__divider"></div>
                <div className="profile__lessons-row">
                    <div className="profile__lessons-lesson">
                        <div className="profile__lessons-name">Теоретическая консультация</div>
                        <div className="profile__lessons-description">Решение профильных вопросов в устной форме</div>
                    </div>
                    <div className="profile__lessons-price">1250 руб</div>
                </div>
                <div className="profile__divider"></div>
                <div className="profile__lessons-row">
                    <div className="profile__lessons-lesson">
                        <div className="profile__lessons-name">Практическое решение текущих проблем</div>
                        <div className="profile__lessons-description">Помощь в вопросах на примере заказчика</div>
                    </div>
                    <div className="profile__lessons-price">1350 руб</div>
                </div>
                <div className="profile__divider"></div>
                <div className="profile__lessons-row">
                    <div className="profile__lessons-lesson">
                        <div className="profile__lessons-name">Решение “под ключ”</div>
                        <div className="profile__lessons-description">Описание задачи с последующим офлайн-решением</div>
                    </div>
                    <div className="profile__lessons-price">1750 руб</div>
                </div>
            </div>
        </div>
    )
}

export default Lessons;