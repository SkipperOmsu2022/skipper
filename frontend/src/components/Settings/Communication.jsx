import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import TextInput from "../../shared/TextInput/TextInput";

const Communication = () => {
    const [initial, setInitial] = useState({
        linkVk: '',
        linkSkype: '',
        linkDiscord: '',
        linkTelegram: ''
    });

    return (
        <Formik
            enableReinitialize
            initialValues = {initial}
            onSubmit = {(data) => {
                console.log({...data});
            }}>
            <Form id="contact-form">
                <div className="settings__column">
                    <div className="settings__header">
                        СПОСОБ КОММУНИКАЦИИ
                    </div>
                    <div className="settings__subheader">
                        Эти ссылки будут отображаться в вашем профиле:
                    </div>
                    <div className="settings__input-group first-group-padding">
                            <label htmlFor="linkVk" className="settings__input-group-label low-top-padding">
                                ВКонтакте: 
                            </label>
                            <TextInput
                                id='linkVk'
                                name='linkVk'
                                type='text'
                                placeholder='Введите ссылку на ваш профиль'
                                className="settings__input-group-text input long-input"
                            />
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                    </div>
                    <div className="settings__input-group">
                            <label htmlFor="linkSkype" className="settings__input-group-label low-top-padding">
                                Skype: 
                            </label>
                            <TextInput
                                id='linkSkype'
                                name='linkSkype'
                                type='text'
                                placeholder='Введите ссылку на ваш профиль'
                                className="settings__input-group-text input long-input"
                            />
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                    </div>
                    <div className="settings__input-group">
                            <label htmlFor="linkDiscord" className="settings__input-group-label low-top-padding">
                                Discord: 
                            </label>
                            <TextInput
                                id='linkDiscord'
                                name='linkDiscord'
                                type='text'
                                placeholder='Введите ссылку на ваш профиль'
                                className="settings__input-group-text input long-input"
                            />
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                    </div>
                    <div className="settings__input-group">
                            <label htmlFor="linkTelegram" className="settings__input-group-label low-top-padding">
                                Telegram: 
                            </label>
                            <TextInput
                                id='linkTelegram'
                                name='linkTelegram'
                                type='text'
                                placeholder='Введите ссылку на ваш профиль'
                                className="settings__input-group-text input long-input"
                            />
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default Communication;