import "./mainPage.scss"
import "../../../shared/checkbox.scss"
import "../../../shared/bookmark.scss"

import search from "../../../resources/icons/search.svg"

import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import useMentorSearchService from "../../../services/mentorSearchService";
import mainPageStore from "../../../store/mainPageStore";

import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import MentorCard from "../../MentorCard/MentorCard";
import Filter from "./Filter";
import Spinner from "../../../shared/spinner/Spinner";

const userId = +localStorage.getItem('logged');

const MentorsList = observer(({displayStart}) => {
    return mainPageStore.mentors.slice(displayStart, displayStart + 6).map((item) => {
        return (
            <MentorCard
                mentor={item}
                onChangeFavorite={mainPageStore.onChangeFavorite}
            />
        )
    })
})

const MainPage = observer(() => {
    const {getMentors, loading, response, error} = useMentorSearchService();

    useEffect(() => {
        updateMentors(0, 0);

        return () => mainPageStore.reset();
    }, []);

    const updateMentors = async (offset, displayStart) => {
        const mentorSpecializations = mainPageStore.filter.filter(item => item.checked).map(item => item.value)
        let dto = {
            offset: offset,
            limit: 30,
            sortFiled: "id",
            query: mainPageStore.search,
            onlyWithPhoto: mainPageStore.onlyWithPhoto,
            userId: userId
        }
        if (mentorSpecializations.length) {
            dto.mentorSpecializations = mentorSpecializations
        }
        const data = await getMentors(dto);

        if (data) mainPageStore.setMentors(data, offset, displayStart);
    }

    const errorMessage = error ? <span className="search-result__error">{response}</span> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <MentorsList displayStart={mainPageStore.displayStart}/> : null;

    return (
        <div className="page-content">
            <div className="app-section-header justify">
                <span>Поиск ментора</span>
                <span>{mainPageStore.totalMentors} специалистов найдено</span>
            </div>  
            <div className="search-wrapper">
                <Filter updateMentors={updateMentors}/>
                <div className="search-result">
                    <div className="search-line">   
                        <input
                            className="search-line__text"
                            placeholder="Подача отчёта налоговой"
                            value={mainPageStore.search}
                            onChange={(e) => mainPageStore.setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    updateMentors(0, 0);
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
                                updateMentors(0, 0);
                            }}
                        />
                    </div>
                    {errorMessage}
                    {spinner}
                    {content}
                    <PaginatedItems 
                        updateItems={updateMentors}
                        offset={mainPageStore.offset}
                        updateDisplayStart={mainPageStore.updateDisplayStart}
                        length={mainPageStore.mentors.length}
                        displayStart={mainPageStore.displayStart}
                        pageCount={mainPageStore.pageCount}
                    />
                </div>
            </div>
        </div>
    )
})

export default MainPage;