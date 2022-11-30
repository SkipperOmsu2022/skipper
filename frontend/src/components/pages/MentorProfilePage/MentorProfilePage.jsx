import { useEffect, useState, useRef } from "react"
import photo from "../../../resources/profile-photo.jpg"
import "../../../shared/submitButton/button.scss"
import "../../../shared/bookmark.scss"
import bookmark from "../../../resources/icons/bookmark.svg";
import "./mentorProfilePage.scss"
import "../ProfilePage/profilePage.scss"

const MentorProfilePage = ({mentor}) => {
    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    const container = useRef();

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        
        return () => document.removeEventListener("click",  handleClickOutside);
    }, []);

    const handleDropdownClick = () => setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownDisplay(false);
        }
    };

    const dropdown = `dropdown ${dropdownDisplay ? '' : 'hide'}`;

    return (
        <div className="page-content">
            <div className="app-section-name"> <span className="inactive" >Профиль |</span> Профиль ментора</div>
            <div className="profile-wrapper">
                <div className="app-section profile mentor">
                    <div className="profile__section">
                        <div className="profile__section-row">
                            <img className="profile__photo" src={photo} alt="" />
                            <div className="profile__main-info">
                                <div className="name">Имя Фамилия</div>
                                <div className="specialty">Специальность ментора</div>
                            </div>
                            <label className="profile__bookmark" htmlFor="switch">
                                <input type="checkbox" className="bookmark-input" id="switch"/>
                                <img className="bookmark-icon bookmark" src={bookmark} alt="" />
                            </label>
                        </div>
                        <div className="complain-btn" ref={container} onClick={handleDropdownClick}
                            onKeyPress={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {
                                    setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);
                                }
                            }}
                        >
                            !
                            <div className={dropdown}>
                                <div className="dropdown-item">Заблокировать пользователя</div>
                                <div className="dropdown-item">Пожаловаться</div>
                            </div>
                        </div>
                    </div>
                    <div className="profile__section-label">О себе</div>
                    <div className="profile__section-content">
                        Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве. Готов помочь с вопросами составления отчетности и прочих бухгалтерских делишек. Также неплохо готовлю и говорю на иврите. Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве. Готов помочь с вопросами составления отчетности и прочих бухгалтерских делишек
                    </div>
                    {/* <div className="profile__no-info">
                        Пользователь не предоставил информацию о себе
                    </div> */}
                    <div className="profile__section">
                        <div className="profile__section-column">
                            <div className="profile__section-label">Контакты</div>
                            {/* <div className="profile__no-info">
                                Пользователь не предоставил контакты для связи
                            </div> */}
                            <div className="profile__contact">
                                <div className="profile__contact-label">
                                    Вконтакте:
                                </div>
                                <div className="profile__contact-link">
                                    ссылка на профиль
                                </div>
                            </div>
                            <div className="profile__contact">
                                <div className="profile__contact-label">
                                    Skype:
                                </div>
                                <div className="profile__contact-link">
                                    ссылка на профиль
                                </div>
                            </div>
                            <div className="profile__contact">
                                <div className="profile__contact-label">
                                    Discord:
                                </div>
                                <div className="profile__contact-link">
                                    ссылка на профиль
                                </div>
                            </div>
                            <div className="profile__contact">
                                <div className="profile__contact-label">
                                    Telegram:
                                </div>
                                <div className="profile__contact-link">
                                    ссылка на профиль
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                        <button className="button">Написать сообщение</button>
                        <button className="button">Перейти на профиль ментора</button>
                    </div>
                </div>
                <div className="app-section profile mentor">
                    <div className="profile__header">Резюме</div>
                    <div className="profile__resume">
                        <div className="profile__resume-row">
                            <div className="profile__resume-header">Образование</div>
                            <div className="profile__resume-header">Опыт работы</div>
                            <div className="profile__resume-header">Сертификаты</div>
                            <div className="profile__resume-header">Прочее</div>
                        </div>
                        <div className="profile__divider padding"></div>
                        <div className="profile__resume-row">
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-text">2001 - 2005 <br/> Магистр, <br/> Уральский Юридический Институт</div>
                                <div className="profile__resume-column-text">2007 - 2011 <br/> Магистр, <br/> Уральский Юридический Институт</div>
                            </div>
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-text">2005 - 2010 <br/> ОАО Сбербанк России</div>
                                <div className="profile__resume-column-text">2010 - 2020 <br/> Собственное ИП</div>
                            </div>
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-wrapper">
                                    <img className="profile__resume-column-image" src="https://blotos.ru/wp-content/uploads/7/2/9/7291bdb944dc662993b6c841a4e5d2b9.jpg" alt="" />
                                </div>
                                <div className="profile__resume-column-wrapper">
                                    <img className="profile__resume-column-image" src="http://baaspik.ru/wp-content/uploads/2015/05/Образец-сертификата.jpg" alt="" />
                                </div>
                            </div>
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-text">Место №3 во всероссийском конкурсе “Алло, мы ищем таланты”</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app-section profile huge-column">
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
                        <button className="button">Смотреть все отзывы</button>
                    </div>
                </div>
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
            </div>
        </div>
    )
}

export default MentorProfilePage;