import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import MentorsList from "../../MentorsList/MentorsList";
import useMentorSearchService from "../../../services/mentorSearchService";
import mentorsListStore from "../../../store/mentorsListStore";
import useAuthContext from "../../../hooks/useAuthContext";

import Spinner from "../../../shared/spinner/Spinner";

import "./favoritesPage.scss"

const itemsPerPage = 6;

const FavoritesPage = observer(() => {
    const { auth: userId } = useAuthContext();
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
                    {mentorsListStore.totalMentors === 0 ? 
                    <div className="no-mentors-found">
                        <div className="no-mentors-found__message">
                            Избранных менторов еще нет
                        </div>
                        <Link
                            to={`/mentors`}
                            className="no-mentors-found__button button"
                        >
                            Перейти к выбору ментора
                        </Link>
                    </div> : null}
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