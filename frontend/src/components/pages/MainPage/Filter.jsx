import useSpecializationService from "../../../services/SpecializationService";
import CustomSelect from "../../../shared/customSelect/CustomSelect";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import mentorsFilterStore from "../../../store/mentorsFilterStore";

const Filter =  observer(({updateMentors}) => {
    const {getSpecializationsList} = useSpecializationService();

    useEffect(() => {
        getSpecializationsList()
            .then(res => {
                mentorsFilterStore.setSpecializations(res)
            })

        return () => mentorsFilterStore.reset();
    }, []);

    return (
        <div className="app-section filter">
                <CustomSelect
                    options={mentorsFilterStore.sortOptions}
                    value={mentorsFilterStore.sortField}
                    onChange={mentorsFilterStore.setSortField}
                    width='296px'
                    placeholder="Сортировка"
                    height='18px'
                    isSearchable={false}
                />
            <div className="filter__section">
                <div className="filter__section-title">
                    <div className="filter__section-title-text">Специальность</div>
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
                        
                        mentorsFilterStore.reset()
                        mentorsFilterStore.setSearch('')
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
    return mentorsFilterStore.specializations?.map((item, i) => (
        <div className="filter__section-list-item" key={i}>
            <input
                type="checkbox"
                className="checkbox"
                id={item.value}
                checked={item.checked}
                onChange={() => mentorsFilterStore.changeChecked(item)}
            />
            <label htmlFor={item.value} className="checkbox-name">{item.label}</label>
        </div>
    ))
})

export default Filter;