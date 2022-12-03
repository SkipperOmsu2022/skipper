const Filter = () => {
    return (
        <div className="app-section filter">
            <div className="filter__section">
                <div className="filter__section-title">
                    <div className="filter__section-title-text">Сфера обучения</div>
                    <div className="filter__section-divider"></div>
                </div>
                <div className="item-wrapper">
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="programming"/>
                        <label htmlFor="programming" className="checkbox-name">Программирование</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="testing"/>
                        <label htmlFor="testing" className="checkbox-name">Тестирование</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="DevOps"/>
                        <label htmlFor="DevOps" className="checkbox-name">DevOps</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="analytics"/>
                        <label htmlFor="analytics" className="checkbox-name">Аналитика</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="Administrating"/>
                        <label htmlFor="Administrating" className="checkbox-name">Администрирование</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="accounting"/>
                        <label htmlFor="accounting" className="checkbox-name">Бухгалтерия</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="kickback"/>
                        <label htmlFor="kickback" className="checkbox-name">Откаты</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="bookkeeping"/>
                        <label htmlFor="bookkeeping" className="checkbox-name">Счетоводство</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="taxes"/>
                        <label htmlFor="taxes" className="checkbox-name">Налоги</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="housing"/>
                        <label htmlFor="housing" className="checkbox-name">Жилищные вопросы</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="Domestic"/>
                        <label htmlFor="Domestic" className="checkbox-name">Бытовые вопросы</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="felonies"/>
                        <label htmlFor="felonies" className="checkbox-name">Тяжкие преступления</label>
                    </div>
                </div>
            </div>
            <div className="filter__section">
                <div className="filter__section-title padding-btm">
                    <div className="filter__section-title-text">Стоимость консультации</div>
                    <div className="filter__section-divider"></div>
                </div>
                <div className="item-wrapper show">
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="500"/>
                        <label htmlFor="500" className="checkbox-name">Менее 500 ₽</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="500-1000"/>
                        <label htmlFor="500-1000" className="checkbox-name">500 - 1000 ₽</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="1000-2000"/>
                        <label htmlFor="1000-2000" className="checkbox-name">1000 - 2000 ₽</label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="2000"/>
                        <label htmlFor="2000" className="checkbox-name">Более 2000 ₽</label>
                    </div>
                </div>
            </div>
            <div className="filter__section">
                <div className="filter__section-title padding-btm">
                    <div className="filter__section-title-text">Рейтинг</div>
                    <div className="filter__section-divider"></div>
                </div>
                <div className="item-wrapper show rating">
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="5stars"/>
                        <label htmlFor="5stars" className="checkbox-name">
                            5 <span className="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</span>
                        </label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="4stars"/>
                        <label htmlFor="4stars" className="checkbox-name">
                            4 <span className="stars">&#9733; &#9733; &#9733; &#9733;</span>
                        </label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="3stars"/>
                        <label htmlFor="3stars" className="checkbox-name">
                            3 <span className="stars">&#9733; &#9733; &#9733;</span>
                        </label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="2stars"/>
                        <label htmlFor="2stars" className="checkbox-name">
                            2 <span className="stars">&#9733; &#9733;</span>
                        </label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="1star"/>
                        <label htmlFor="1star" className="checkbox-name">
                            1 <span className="stars">&#9733;</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="filter__section">
                <div className="filter__section-title padding-btm">
                    <div className="filter__section-divider"></div>
                </div>
                <div className="item-wrapper show">
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="photo"/>
                        <label htmlFor="photo" className="checkbox-name">
                            Только с фото   
                        </label>
                    </div>
                    <div className="filter__section-list-item">
                        <input type="checkbox" className="checkbox" id="review"/>
                        <label htmlFor="review" className="checkbox-name">
                            Только с отзывами
                        </label>
                    </div>
                </div>
            </div>
            <div className="filter__btn-block">
                <button className="button">Применить</button>
                <button className="button pale">Сбросить</button>
            </div>
        </div>
    )
}

export default Filter;