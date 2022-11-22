import { Outlet, NavLink } from 'react-router-dom';

import "./settingsPage.scss"
import Button from "../../../shared/submitButton/Button"
import useSettingsService from "../../../services/settingsService";

const SettingsPage = () => {
    const {setAccountData, loading, response, error} = useSettingsService();

    return (
        <div className='page-content'>
            <div className="app-section-name">
                Настройки профиля
            </div>
            <section className="app-section settings">
                <div className="fixed-content">
                    <nav className="settings__navigation">
                        <ul className="settings__navigation-ul">
                            <li>
                                <NavLink end to="." className={({ isActive }) => isActive ? "settings__navigation-li active" : "settings__navigation-li"}>
                                    Общая информация
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end to="./account" className={({ isActive }) => isActive ? "settings__navigation-li active" : "settings__navigation-li"}>
                                    Настройки аккаунта
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end to="./communication" className={({ isActive }) => isActive ? "settings__navigation-li active" : "settings__navigation-li"}>
                                    Способ коммуникации
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end to="./mentor" className={({ isActive }) => isActive ? "settings__navigation-li active" : "settings__navigation-li"}>
                                    Настройки ментора
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Button className="button submit-button"
                        text="СОХРАНИТЬ"
                        loading={loading}
                        form="contact-form"
                        type="submit"
                    />
                    <div className={`response ${error ? 'error' : ''}`}>
                        {response}
                    </div>
                </div>
                    <Outlet context={{setAccountData}}/>
            </section>
        </div>
    )
}

export default SettingsPage;