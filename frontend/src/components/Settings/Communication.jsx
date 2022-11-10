import { Formik, Form, Field, ErrorMessage, useField } from "formik";

const Communication = () => {
    return (
        <form>
            <div className="settings__column">
                <div className="settings__header">
                    СПОСОБ КОММУНИКАЦИИ
                </div>
                <div className="settings__subheader">
                    Эти ссылки будут отображаться в вашем профиле:
                </div>
                <div className="settings__input-group">
                        <label htmlFor="vk" className="settings__input-group-label">
                            ВКонтакте: 
                        </label>    
                        <input className="settings__input-group-text input long-input" type="text" id="vk"
                            placeholder="Введите ссылку на ваш профиль"/>
                        <span className="settings__input-group-btn-width settings__input-group-delete">
                            Удалить
                        </span>
                </div>
                <div className="settings__input-group">
                        <label htmlFor="skype" className="settings__input-group-label">
                            Skype: 
                        </label>    
                        <input className="settings__input-group-text input long-input" type="text" id="skype"
                            placeholder="Введите ссылку на ваш профиль"/>
                        <span className="settings__input-group-btn-width settings__input-group-delete">
                            Удалить
                        </span>
                </div>
                <div className="settings__input-group">
                        <label htmlFor="discord" className="settings__input-group-label">
                            Discord: 
                        </label>    
                        <input className="settings__input-group-text input long-input" type="text" id="discord"
                            placeholder="Введите ссылку на ваш профиль"/>
                        <span className="settings__input-group-btn-width settings__input-group-delete">
                            Удалить
                        </span>
                </div>
                <div className="settings__input-group">
                        <label htmlFor="telegram" className="settings__input-group-label">
                            Telegram: 
                        </label>    
                        <input className="settings__input-group-text input long-input" type="text" id="telegram"
                            placeholder="Введите ссылку на ваш профиль"/>
                        <span className="settings__input-group-btn-width settings__input-group-delete">
                            Удалить
                        </span>
                </div>
            </div>
        </form>
    )
}

export default Communication;