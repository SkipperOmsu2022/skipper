import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import TextInput from "../../shared/TextInput/TextInput";
import "../../shared/switch.scss"
import CustomSelect, {CustomMutableSelect} from "../../shared/customSelect/CustomSelect";

const Mentor = () => {
    const [mentor, setMentor] = useState(false);
    const [aboutMe, setAboutMe] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [showSwitchMsg, setShowSwitchMsg] = useState(true);


    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [qualification, setQualification] = useState("");
    const [initial, setInitial] = useState({
        
    });

    const handleMentorChange = () => {
        if(mentor && aboutMe && specialty) {
            setMentor(false)
        } else if (aboutMe && specialty) {
            setMentor(true)
        }
    }
    const handleAboutMeChange = (e) => {
        setAboutMe(e.target.value)
        if (!e.target.value || !specialty) {
            setMentor(false)
            setShowSwitchMsg(true)
        } else {
            setShowSwitchMsg(false)
        }
    }
    const handleSpecialtyChange = (e) => {
        setSpecialty(e.target.value)
        if (!aboutMe || !e.target.value) {
            setMentor(false)
            setShowSwitchMsg(true)
        } else {
            setShowSwitchMsg(false)
        }
    }

    const switchMessage = mentor ? 
        <div className="state">
            <span className="active">Активный</span>
        </div> : 
        <div className="state">
            <span className="inactive">Неактивный &#160;</span>
            <div className="message">
                (Для активации заполните поля "О себе" и "Специальность")
            </div>
        </div>;

    const currentYear = (new Date()).getFullYear();
    let mutableOptions = [];

    mutableOptions = startYear ?  Array(currentYear - startYear + 2).fill(null).map((element, i, arr) => (
        i === 0 ? arr[i] = {value: null, label: "Настоящее время"} :
        arr[i] = {value: currentYear - i + 1, label: currentYear - i + 1}
    )) : [];

    console.log(mutableOptions)
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
                            <label htmlFor="switch" className="settings__input-group-label">
                                Текущий статус:
                            </label>
                            <label className={`switch ${showSwitchMsg ? "msg" : ""}`}>
                                    <input
                                        id="switch"
                                        className="switch__input"
                                        type="checkbox"
                                        disabled={!aboutMe || !specialty}
                                        checked={mentor}
                                        onChange={handleMentorChange}/>
                                    <div className="switch__slider switch__circle"></div>
                            </label>
                            {switchMessage}
                    </div>
                    <div className="settings__input-group">
                        <label htmlFor="aboutMe" className="settings__input-group-label low-top-padding">
                            О себе<br></br>(как о менторе)*:
                        </label>
                        <textarea
                            className="settings__input-group-text input textarea wide high"
                            placeholder="Расскажите немного о себе:"
                            id="aboutMe"
                            maxLength='400'
                            value={aboutMe}
                            onChange={handleAboutMeChange}/>
                    </div>
                    <div className="settings__input-group">
                        <label htmlFor="specialty" className="settings__input-group-label middle-top-padding">
                            Специальность*:
                        </label>
                        <textarea
                            className="settings__input-group-text input textarea wide medium-height"
                            placeholder="Добавьте свою специализацию:"
                            id="specialty"
                            maxLength='100'
                            value={specialty}
                            onChange={handleSpecialtyChange}/>
                    </div>
                    <div className="settings__input-group">
                        <label className="settings__input-group-label middle-top-padding">
                            Образование: 
                        </label>
                        <div className="education-group">
                            <div className="education">
                                <div className="settings__input-group-box">
                                    <div className="group">
                                        <CustomMutableSelect
                                            name={"year"}
                                            placeholder="Год начала"
                                            value={startYear}
                                            onChange={(selectedOption) => {
                                                setStartYear(selectedOption.label)
                                                setEndYear("")
                                            }}
                                        />
                                    </div>
                                    <div className="group">
                                        <CustomMutableSelect
                                            placeholder="Год окончания"
                                            noOptionsMessage={"Выберите год начала"}
                                            mutableOptions={mutableOptions}
                                            value={endYear}
                                            onChange={(selectedOption) => {
                                                setEndYear(selectedOption.value)
                                            }}
                                        />
                                    </div>
                                    <div className="group" >
                                        <CustomMutableSelect
                                            name={"qualification"}
                                            placeholder="Квалификация"
                                            value={qualification}
                                            onChange={(selectedOption) => {
                                                setQualification(selectedOption.value)
                                            }}
                                            width='30.15rem'
                                        />
                                    </div>
                                    <textarea className="settings__input-group-text input textarea small" placeholder="Добавьте свою специализацию:"
                                        id="aboutMe" maxLength='100'/>
                                </div>
                                <div className='wrapper'>
                                    <span className="settings__input-group-btn-width settings__input-group-delete">
                                        Удалить
                                    </span>
                                    <button className="button settings__input-group-button">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="settings__input-group">
                        <label className="settings__input-group-label middle-top-padding">
                            Опыт работы: 
                        </label>
                        <div className="experience-group">
                            <div className="experience">
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
                                <div className='wrapper'>
                                    <span className="settings__input-group-btn-width settings__input-group-delete">
                                        Удалить
                                    </span>
                                </div>
                            </div>
                            <div className="experience">
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
                                <div className='wrapper'>
                                    <span className="settings__input-group-btn-width settings__input-group-delete">
                                        Удалить
                                    </span>
                                    <button className="button settings__input-group-button">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="settings__input-group">
                        <label htmlFor="upload-photo" className="settings__input-group-label">
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
                        <div className='wrapper'>
                            {/* <span className="settings__input-group-btn-width settings__input-group-delete padding-left">
                                Удалить
                            </span> */}
                        </div>
                    </div>
                    <div className="settings__input-group">
                        <label htmlFor="other" className="settings__input-group-label middle-top-padding">
                            Прочая информация: 
                        </label>
                        <div className="settings__input-group-box">
                            <textarea className="settings__input-group-text input textarea" placeholder="Добавьте информацию:"
                                id="other" maxLength='100'/>
                        </div>
                        {/* <wrapper className='wrapper'>
                            <button className="button settings__input-group-button">
                                +
                            </button>
                            <span className="settings__input-group-btn-width settings__input-group-delete">
                                Удалить
                            </span>
                        </wrapper> */}
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default Mentor;