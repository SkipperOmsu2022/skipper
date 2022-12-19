import "./mainPage.scss"
import "../../../shared/checkbox.scss"
import "../../../shared/bookmark.scss"
import bookmark from "../../../resources/icons/bookmark.svg";
import search from "../../../resources/icons/search.svg"
import photo from "../../../resources/profile-photo.jpg"

import enviroments from "../../../config/enviroments";

import ReactPaginate from 'react-paginate';
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import useMentorSearchService from "../../../services/mentorSearchService";
import mainPageStore from "../../../store/mainPageStore";

import Filter from "./Filter";
import Spinner from "../../../shared/spinner/Spinner";

const Mentors = observer(({newOffset}) => {
    return (
        <>
            {mainPageStore.currentMentors.slice(newOffset, newOffset + 6).map((item, i) => {
                const imageUserResource = item.imageUserResource ? `${enviroments.apiBase}${item.imageUserResource}` : photo;
                return (
                <div className="mentor" key={item.id}>
                    <div className="mentor__photo">
                        <img className="mentor__photo-img" src={imageUserResource || photo} alt="user-avatar"/>
                        <div className="rating">
                            <span className="rating-star">&#9733;</span>
                            <span className="rating-value">{item.rating}</span>
                        </div>
                    </div>
                    <div className="mentor__main-info">
                        <div className="header">
                            <div className="header__column">
                                <div className="header__column-name">
                                    {`${item.firstName} ${item.lastName}`}
                                </div>
                                <div className="header__column-specialty">
                                    {item.mentorSpecializations}
                                </div>
                            </div>
                            {/* <label className="header__bookmark bookmark" htmlFor={`switch${i}`}>
                                <input
                                    type="checkbox"
                                    className="bookmark-input"
                                    id={`switch${i}`}
                                    checked={item.favorite}
                                    onChange={() => mainPageStore.changeFavorite(item)}
                                />
                                <img className="bookmark-icon" src={bookmark} alt="" />
                            </label> */}
                        </div>
                        <div className="description">
                            {item.aboutMeAsMentor}
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
                                to={`/profile-mentor/${item.id}`}
                                className="button pale"
                                //
                                    state={{ rating: item.rating }}
                                //
                            >
                                Посмотреть профиль
                            </Link>
                        </div>
                    </div>
                </div>
            )})}
        </>
    );
})

const PaginatedItems = observer(() => {
    const itemsPerPage = 6;
    const pageCount = Math.ceil(mainPageStore.pageCount)
    
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % mainPageStore.totalMentors;

        mainPageStore.updateOffset(newOffset);
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
                forcePage={mainPageStore.offset / 6}
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
})

const MainPage = observer(() => {
    const {getMentors, loading, response, error} = useMentorSearchService();

    useEffect(() => {
        mainPageStore.setSearch('')
        //
        if (mainPageStore.mentors.length === 0) updateMentors();
        //
    }, []);

    const updateMentors = async () => {
        const data = await getMentors(``);
        mainPageStore.setMentors(data);
    }

    const errorMessage = error ? <span className="search-result__error">{response}</span> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <Mentors newOffset={mainPageStore.offset}/> : null;

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
                        <input
                            className="search-line__text"
                            placeholder="Подача отчёта налоговой"
                            value={mainPageStore.search}
                            onChange={(e) => mainPageStore.setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    mainPageStore.updateCurrentMentors(0);
                                }
                            }}
                        />
                        <img 
                            className="search-line__icon"
                            src={search}
                            alt="seach-icon"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                                mainPageStore.updateCurrentMentors(0);
                            }}
                        />
                    </div>
                    {errorMessage}
                    {spinner}
                    {content}
                    <PaginatedItems/>
                </div>
            </div>
        </div>
    )
})

export default MainPage;