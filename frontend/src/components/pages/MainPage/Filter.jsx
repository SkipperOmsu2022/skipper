import useSpecializationService from "../../../services/SpecializationService";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import mainPageStore from "../../../store/mainPageStore";

const Filter =  observer(({updateMentors}) => {
    const {getSpecializationsList} = useSpecializationService();

    useEffect(() => {
        getSpecializationsList()
            .then(res => {
                mainPageStore.setFilter(res)
            })
    }, []);

    return (
        <div className="app-section filter">
            <div className="filter__section">
                <div className="filter__section-title">
                    <div className="filter__section-title-text">Сфера обучения</div>
                    <div className="filter__section-divider"></div>
                </div>
                <div className="item-wrapper">
                    <Specializations/>
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
                    <Rating/>
                </div>
            </div>
            <div className="filter__section">
                <div className="filter__section-title padding-btm">
                    <div className="filter__section-divider"></div>
                </div>
                <div className="item-wrapper show">
                    <div className="filter__section-list-item">
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="photo"
                            checked={mainPageStore.onlyWithPhoto}
                            onChange={() => mainPageStore.changeOnlyWithPhoto()}
                        />
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
                <button 
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });

                        updateMentors(0, 0)
                    }}
                    className="button"
                >
                    Применить
                </button>
                <button
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                        
                        mainPageStore.reset()
                        mainPageStore.setSearch('')
                        updateMentors(0, 0)
                    }}
                    className="button pale"
                >
                    Сбросить
                </button>
            </div>
        </div>
    )
})

const Specializations = observer(() => {
    return (
        <>
            {mainPageStore.filter.map((item, i) => (
                <div className="filter__section-list-item" key={i}>
                    <input
                        type="checkbox"
                        className="checkbox"
                        id={item.value}
                        checked={item.label.checked}
                        onChange={() => mainPageStore.changeChecked(item)}
                    />
                    <label htmlFor={item.value} className="checkbox-name">{item.label}</label>
                </div>
            ))}
        </>
    );
})

const Rating = observer(() => {
    return (
        <>
            {mainPageStore.ratingFilter.map((item, i) => (
                <div className="filter__section-list-item" key={`${item.value}star`}>
                    <input
                        type="checkbox"
                        className="checkbox"
                        id={`${item.value}star`}
                        checked={item.checked}
                        onChange={() => mainPageStore.changeChecked(item)}
                    />
                    <label htmlFor={`${item.value}star`} className="checkbox-name">
                        {item.value} <span className="stars">{'★ '.repeat(item.value)}</span>
                    </label>
                </div>
            ))}
        </>
    );
})

export default Filter;