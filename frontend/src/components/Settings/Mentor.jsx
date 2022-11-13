import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import TextInput from "../../shared/TextInput/TextInput";
import "../../shared/switch.scss"
import CustomSelect from "../../shared/customSelect/CustomSelect";

const Mentor = () => {
    const [initial, setInitial] = useState({
        
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
                        НАСТРОЙКИ МЕНТОРА
                    </div>
                    <div className="settings__input-group first-group-padding">
                            <label htmlFor="linkVk" className="settings__input-group-label">
                                Текущий статус: 
                            </label>
                            <label className="switch">
                                <input className="switch__input" type="checkbox"/>
                                <span className="switch__slider switch__circle"></span>
                            </label>
                            <span className="switch__state active">
                                Активный
                            </span>
                            <span className="switch__state inactive">
                                Неактивный
                            </span>
                    </div>
                    <div className="settings__input-group">
                        <label htmlFor="aboutMe" className="settings__input-group-label low-top-padding">
                            О себе<br></br>(как о менторе):
                        </label>
                        <textarea className="settings__input-group-text input textarea wide high" placeholder="Расскажите немного о себе:"
                            id="aboutMe" maxLength='400'/>
                    </div>
                    <div className="settings__input-group">
                        <label htmlFor="aboutMe" className="settings__input-group-label middle-top-padding">
                            Специальность:
                        </label>
                        <textarea className="settings__input-group-text input textarea wide medium-height" placeholder="Добавьте свою специализацию:"
                            id="aboutMe" maxLength='100'/>
                    </div>
                    <div className="settings__input-group">
                        <label className="settings__input-group-label middle-top-padding">
                            Образование: 
                        </label>
                        <div className="settings__input-group-box">
                            <div className="group">
                                <CustomSelect
                                    name={"year"}
                                    placeholder="Год начала"
                                    error={false}
                                    value={''}
                                    onChange={() => ('1')}
                                    onBlur={() => ('1')}
                                />
                            </div>
                            <div className="group">
                                <CustomSelect
                                    name={"year"}
                                    placeholder="Год окончания"
                                    error={false}
                                    value={''}
                                    onChange={() => ('1')}
                                    onBlur={() => ('1')}
                                />
                            </div>
                            <div className="group" >
                                <CustomSelect
                                    name={"year"}
                                    placeholder="Квалификация"
                                    error={false}
                                    value={''}
                                    onChange={() => ('1')}
                                    onBlur={() => ('1')}
                                    width='30.15rem'
                                />
                            </div>
                            <textarea className="settings__input-group-text input textarea small" placeholder="Добавьте свою специализацию:"
                                id="aboutMe" maxLength='100'/>
                        </div>
                        <wrapper className='wrapper'>
                            <button className="button settings__input-group-button">
                                +
                            </button>
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                        </wrapper>
                    </div>
                    <div className="settings__input-group">
                        <label className="settings__input-group-label middle-top-padding">
                            Опыт работы: 
                        </label>
                        <div className="settings__input-group-box">
                            <div className="group">
                                <CustomSelect
                                    name={"year"}
                                    placeholder="Год начала"
                                    error={false}
                                    value={''}
                                    onChange={() => ('1')}
                                    onBlur={() => ('1')}
                                />
                            </div>
                            <div className="group">
                                <CustomSelect
                                    name={"year"}
                                    placeholder="Год окончания"
                                    error={false}
                                    value={''}
                                    onChange={() => ('1')}
                                    onBlur={() => ('1')}
                                />
                            </div>
                            <textarea className="settings__input-group-text input textarea small" placeholder="Место работы:"
                                id="aboutMe" maxLength='100'/>
                        </div>
                        <wrapper className='wrapper'>
                            <button className="button settings__input-group-button">
                                +
                            </button>
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                        </wrapper>
                    </div>
                    <div className="settings__input-group">
                        <label htmlFor="aboutMe" className="settings__input-group-label">
                            Сертификаты:
                        </label>
                        <div className="certificates">
                            <label htmlFor="upload-photo" className="button settings__photo-button">
                                Загрузить
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="upload-photo"
                                className="settings__photo-input"
                            />
                            <div className="certificates__description">
                                Размер файла не должен привышать 1 Мб
                            </div>
                        </div>
                        <wrapper className='wrapper'>
                            <span className="settings__input-group-btn-width settings__input-group-delete padding-left">
                                Удалить
                            </span>
                        </wrapper>
                    </div>
                    <div className="settings__input-group">
                        <label className="settings__input-group-label middle-top-padding">
                            Прочая информация: 
                        </label>
                        <div className="settings__input-group-box">
                            <textarea className="settings__input-group-text input textarea" placeholder="Добавьте информацию:"
                                id="aboutMe" maxLength='100'/>
                        </div>
                        <wrapper className='wrapper'>
                            <button className="button settings__input-group-button">
                                +
                            </button>
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                        </wrapper>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default Mentor;