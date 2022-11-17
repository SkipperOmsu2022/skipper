import { Outlet, NavLink } from 'react-router-dom';

import "./settingsPage.scss"
import Button from "../../../shared/submitButton/Button"
import useSettingsService from "../../../services/settingsService";

const SettingsPage = () => {
    const {setAccountData, loading, response, error} = useSettingsService();

    return (
        <>
            <section className="settings">
                <div className="settings__column">
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
        </>
    )
}

export default SettingsPage;