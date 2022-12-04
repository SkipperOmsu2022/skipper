import "./mainPage.scss"
import "../../../shared/checkbox.scss"
import "../../../shared/bookmark.scss"
import bookmark from "../../../resources/icons/bookmark.svg";
import search from "../../../resources/icons/search.svg"
import photo from "../../../resources/profile-photo.jpg"

import ReactPaginate from 'react-paginate';
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import useMentorSearchService from "../../../services/mentorSearchService";
import mainPageStore from "../../../store/mainPageStore";

import Filter from "./Filter";
import Spinner from "../../../shared/spinner/Spinner";

const Mentors = () => {
    return (
        <>
            {mainPageStore.mentors.map((item, i) => (
                <div className="mentor" key={i}>
                    <div className="mentor__photo">
                        <img className="mentor__photo-img" src={photo} alt="user-avatar"/>
                        <div className="rating">
                            <span className="rating-star">&#9733;</span>
                            <span className="rating-value">4,5</span>
                        </div>
                    </div>
                    <div className="mentor__main-info">
                        <div className="header">
                            <div className="header__column">
                                <div className="header__column-name">
                                    {/* {`${item.firstName} ${item.lastName}`} */}
                                    {item.name}
                                </div>
                                <div className="header__column-specialty">
                                    {/* {item.specialty} */}
                                    {item.email}
                                </div>
                            </div>
                            <label className="header__bookmark bookmark" htmlFor={`switch${i}`}>
                                <input
                                    type="checkbox"
                                    className="bookmark-input"
                                    id={`switch${i}`}
                                    checked={item.favorite}
                                    onChange={() => mainPageStore.changeFavorite(item)}
                                />
                                <img className="bookmark-icon" src={bookmark} alt="" />
                            </label>
                        </div>
                        <div className="description">
                            {/* {item.aboutMe} */}
                            {item.body}
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
                            <button className="button pale">Посмотреть профиль</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

const PaginatedItems = ({updateMentors}) => {
    const itemsPerPage = 6;
    const pageCount = Math.ceil( mainPageStore.totalMentors / itemsPerPage)
    
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % mainPageStore.totalMentors;
        updateMentors('', newOffset);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={6}
                marginPagesDisplayed={0}
                pageCount={pageCount}
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
        </>
    );
}

const MainPage = observer(() => {
    const {getMentors, loading, response, error} = useMentorSearchService();

    useEffect(() => {
        updateMentors('', mainPageStore.offset);
    }, []);

    const updateMentors = async (url, offset) => {
        const data = await getMentors(`https://jsonplaceholder.typicode.com/comments`, offset);
        
        mainPageStore.setMentors(data, offset);
    }

    const errorMessage = error ? <span className="search-result__error">Что-то пошло не так</span> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <Mentors/> : null;

    return (
        <div className="page-content">
            <div className="app-section-header justify">
                <span>Поиск ментора</span>
                <span>{mainPageStore.totalMentors} специалистов найдено</span>
            </div>  
            <div className="search-wrapper">
                <Filter/>
                <div className="search-result">
                    <div className="search-line">   
                        <input className="search-line__text" placeholder="Подача отчёта налоговой"/>
                        <img 
                            className="search-line__icon"
                            src={search}
                            alt="seach-icon"
                            onClick={() => {
                                updateMentors('', 0);
                            }}
                        />
                    </div>
                    {errorMessage}
                    {spinner}
                    {content}
                    <PaginatedItems updateMentors={updateMentors}/>
                </div>
            </div>
        </div>
    )
})

export default MainPage;