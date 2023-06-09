import "./mainPage.scss"
import "../../../shared/checkbox.scss"
import "../../../shared/bookmark.scss"

import search from "../../../resources/icons/search.svg"

import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import useMentorSearchService from "../../../services/mentorSearchService";
import mentorsListStore from "../../../store/mentorsListStore";
import mentorsFilterStore from "../../../store/mentorsFilterStore";

import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import MentorsList from "../../MentorsList/MentorsList";
import Filter from "./Filter";
import Spinner from "../../../shared/spinner/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";

const MainPage = observer(() => {
    const { auth: userId } = useAuthContext();
    const {getMentors, loading, response, error} = useMentorSearchService();
    const itemsPerPage = 6;
    const limitPerRequest = 30;

    useEffect(() => {
        updateMentors(0, 0);

        return () => mentorsListStore.resetStore()
    }, []);

    const updateMentors = async (offset, displayStart) => {
        const mentorSpecializations = mentorsFilterStore.specializations.filter(item => item.checked).map(item => item.value)
        let dto = {
            offset: offset,
            limit: 30,
            sortField: mentorsFilterStore.sortField.value,
            query: mentorsFilterStore.search,
            onlyWithPhoto: mentorsFilterStore.onlyWithPhoto
        }
        if (mentorSpecializations.length) {
            dto.mentorSpecializations = mentorSpecializations
        }
        if (userId) {
            dto.userId = userId
        }
        const data = await getMentors(dto, 'page_sort_filter');

        if (data) mentorsListStore.setMentors(data, offset, displayStart, itemsPerPage);
    }

    const errorMessage = error ? <span className="search-result__error">{response}</span> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <MentorsList displayStart={mentorsListStore.displayStart}/> : null;

    return (
        <div className="page-content">
            <div className="app-section-header justify">
                <span>Поиск ментора</span>
                <span>{mentorsListStore.totalMentors} специалистов найдено</span>
            </div>  
            <div className="search-wrapper">
                <Filter updateMentors={updateMentors}/>
                <div className="search-result">
                    <div className="search-line">   
                        <input
                            className="search-line__text"
                            placeholder="Подача отчёта налоговой"
                            value={mentorsFilterStore.search}
                            onChange={(e) => mentorsFilterStore.setSearch(e.target.value)}
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
                        updateDisplayStart={mentorsListStore.updateDisplayStart}
                        offset={mentorsListStore.offset}
                        displayStart={mentorsListStore.displayStart}
                        length={mentorsListStore.mentors.length}
                        pageCount={mentorsListStore.pageCount}
                        itemsPerPage={itemsPerPage}
                        limitPerRequest={limitPerRequest}
                    />
                </div>
            </div>
        </div>
    )
})

export default MainPage;