import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import photo from "../../../resources/profile-photo.jpg"
import bookmark from "../../../resources/icons/bookmark.svg";

import "./favoritesPage.scss"

const FavoritesPage = () => {

    return (
        <div className='page-content cards-width'>
            <div className="app-section-header">
                Избранное
            </div>
            <div className="favorites-list">
                <div className="mentor max-width" /* key={item.id} */>
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
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={() => {}}
                    forcePage={1}
                    pageRangeDisplayed={6}
                    marginPagesDisplayed={0}
                    pageCount={60}
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
            </div>
        </div>
    )
}

export default FavoritesPage;