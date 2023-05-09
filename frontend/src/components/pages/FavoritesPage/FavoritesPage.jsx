import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import MentorsList from "../../MentorsList/MentorsList";
import useMentorSearchService from "../../../services/mentorSearchService";
import mentorsListStore from "../../../store/mentorsListStore";

import Spinner from "../../../shared/spinner/Spinner";

import "./favoritesPage.scss"

const userId = +localStorage.getItem('logged');
const itemsPerPage = 6;

const FavoritesPage = observer(() => {
    const {getMentors, loading, response, error} = useMentorSearchService();

    useEffect(() => {
        updateMentors(0, 0);
    }, []);

    const updateMentors = async (offset, displayStart) => {
        let dto = {
            userId: userId,
            offset: offset,
            limit: 30
        }
        
        const data = await getMentors(dto, 'favorites/');

        if (data) mentorsListStore.setMentors(data, offset, displayStart, itemsPerPage);
    }

    const errorMessage = error ? <span className="search-result__error">{response}</span> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <MentorsList displayStart={mentorsListStore.displayStart} maxWidth={true}/> : null;
    
    return (
        <div className='page-content cards-width'>
            <div className="app-section-header">
                Избранное
            </div>
            <div className="favorites-list">
                    {errorMessage}
                    {spinner}
                    {content}
                    <PaginatedItems 
                        updateItems={updateMentors}
                        offset={mentorsListStore.offset}
                        updateDisplayStart={mentorsListStore.updateDisplayStart}
                        length={mentorsListStore.mentors.length}
                        displayStart={mentorsListStore.displayStart}
                        pageCount={mentorsListStore.pageCount}
                    />
            </div>
        </div>
    )
})

export default FavoritesPage;

/* 
<div className="mentor max-width" key={item.id} >
<div className="mentor__photo">
<img className="mentor__photo-img" src={photo} alt="user-avatar"/>
<div className="rating">
    <span className="rating-star">&#9733;</span>
    <span className="rating-value">{'4,7'}</span>
</div>
</div>
<div className="mentor__main-info">
<div className="header">
    <div className="header__column">
        <div className="header__column-name">
            {`Фамилия Имя`}
        </div>
        <div className="header__column-specialty">
            'Специальность'
        </div>
    </div>
    <label className="header__bookmark bookmark" htmlFor={`switch${1}`}>
        <input
            type="checkbox"
            className="bookmark-input"
            id={`switch${1}`}
            checked={true}
        />
        <img className="bookmark-icon" src={bookmark} alt="" />
    </label>
</div>
<div className="description">
    {'Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве. Готов помочь с вопросами составления отчетности и прочих бухгалтерских делишек. Также неплохо готовлю и говорю на иврите.'}
</div>
</div>
<div className="mentor__divider"/>
<div className="mentor__interaction">
<div className="mentor__interaction-info">
    <span>От 1200 ₽</span>
    <span>20 отзывов</span>
</div>
<div className="mentor__interaction-btn-block">
    <button className="button">Забронировать</button>
    <Link
        to={`/profile-mentor/${1}`}
        className="button pale"
    >
        Посмотреть профиль
    </Link>
</div>
</div>
</div>
*/