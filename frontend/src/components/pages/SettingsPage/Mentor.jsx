import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import {MutableSelect, MultipleSelect, CustomAsyncSelect} from "../../../shared/customSelect/CustomSelect";
import mentorSettingsStore from "../../../store/mentorSettingsStore";

import useSpecializationService from "../../../services/SpecializationService";

import cross from "../../../resources/icons/cross.svg"
import "../../../shared/switch.scss"

const Mentor = observer(() => {
    const {getUserData, setUserData, clearResponse} = useOutletContext();
    const {getSpecializationsList} = useSpecializationService();

    const [experienceStart, setExperienceStart] = useState("");
    const [experienceEnd, setExperienceEnd] = useState("");
    const [experienceName, setExperienceName] = useState("");
    
    const [certificates, setCertificates] = useState([]);
    const [certificateErr, setCertificateErr] = useState(false);

    useEffect(() => {
        getSpecializationsList()
            .then(res => mentorSettingsStore.setSpecializationOptions(res))
            .then(() => getUserData('user/profile/settings/mentor/'))
            .then(res => mentorSettingsStore.setMentorData(res))
        
        return () => clearResponse();
    }, []);

    const onCertificateChange = (e) => {
        try {
			e.preventDefault();
			let file;

			if (e.dataTransfer) {
				file = e.dataTransfer.files[0];
			} else if (e.target) {
				file = e.target.files[0];
			}

			const reader = new FileReader();

			if (!reader) return;

            if (file.type !== "image/gif" & file.type !== "image/png" & file.type !== "image/jpeg") {
                setCertificateErr("Неправильный формат файла");
                return;
            } else if (file.size > 1048576){
                setCertificateErr("Слишком большой файл");
                return;
            }

			reader.onload = () => {
				setCertificates(certificates => [...certificates, reader.result?.toString()]);
				e.target.value = null;
			};

			reader.readAsDataURL(file);
		} catch (error) {
			console.log(error);
		}
    };

    const onDeleteCertificate = (i) => {
        setCertificates([...certificates.slice(0, i), ...certificates.slice(i + 1)])
    }

    function certificatesView() {
        const elements = certificates.map((item, i) => {
            return (
                <div className="certificates__group-item" key={i}>
                    <div className="img-wrapper">
                        <img src={item} alt="certificate" className="certificates__group-item-image"/>
                        <img src={cross} alt="certificate" className="certificates__group-item-cross"
                            onClick={() => onDeleteCertificate(i)}/>
                    </div>
                </div>
            )
        })
    
        return (
            <div className="certificates__group">
                {elements}
            </div>
        )
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (mentorSettingsStore.validate()) {
            setUserData({
                isEnabledMentorStatus: mentorSettingsStore.mentor,
                aboutMeAsMentor: mentorSettingsStore.aboutMentor,
                mentorSpecializations: mentorSettingsStore.mentorsSpecializations
                    .map((item) => item.value),
                educations: mentorSettingsStore.getEducation()
            }, 'user/profile/settings/mentor/');
        }
    }
    
    return (
        <form 
            id="contact-form" 
            onSubmit={onSubmit}>
            <div className="settings__column">
                <div className="settings__header">
                    НАСТРОЙКИ МЕНТОРА
                </div>
                <div className="settings__input-group first-group-padding">
                        <label htmlFor="switch" className="settings__input-group-label">
                            Текущий статус:
                        </label>
                        <label className={`switch ${mentorSettingsStore.aboutMentor && mentorSettingsStore.mentorsSpecializations.length ? "" : "msg"}`}>
                            <input
                                id="switch"
                                className="switch__input"
                                type="checkbox"
                                disabled={!mentorSettingsStore.aboutMentor || !mentorSettingsStore.mentorsSpecializations.length}
                                checked={mentorSettingsStore.mentor}
                                onChange={mentorSettingsStore.handleSwitchChange}/>
                            <div className="switch__slider switch__circle"></div>
                        </label>
                        {mentorSettingsStore.mentor ? 
                            <div className="state">
                                <span className="active">Активный</span>
                            </div> : 
                            <div className="state">
                                <span className="inactive">Неактивный</span>
                                <div className="message">
                                    (Для активации заполните поля "О себе" и "Специальность")
                                </div>
                            </div>
                        }
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
                        value={mentorSettingsStore.aboutMentor}
                        onChange={mentorSettingsStore.handleAboutMeChange}/>
                </div>
                <div className="settings__input-group">
                    <label htmlFor="specialty" className="settings__input-group-label middle-top-padding">
                        Специальность*:
                    </label>
                        <div className="group">
                            <MultipleSelect
                                placeholder="Добавьте свою специализацию"
                                value={mentorSettingsStore.mentorsSpecializations}
                                multipleOptions={mentorSettingsStore.specializationOptions}
                                noOptionsMessage='Специальностей не найдено'
                                onChange={mentorSettingsStore.handleSpecializationChange}
                                width='30.15rem'
                                minHeight='fit-content'
                            />
                        </div>
                </div>
                <div className="settings__input-group">
                    <label className="settings__input-group-label middle-top-padding">
                        Образование: 
                    </label>
                    <div className="education-group">
                        {mentorSettingsStore.education.length ? null :
                            <button className="button settings__input-group-button" onClick={mentorSettingsStore.addEducation}>
                                +
                            </button>
                        }
                        {mentorSettingsStore.education.map((item, i) => (
                            <div className="education" key={item.id}>
                                <div className="settings__input-group-box">
                                    <div className="group">
                                        <MutableSelect
                                            name="year"
                                            placeholder="Год начала"
                                            value={item.dateStart}
                                            onChange={(e) => {
                                                mentorSettingsStore.setEducation(e, i, 'dateStart')
                                            }}
                                        />
                                    </div>
                                    <div className="group">
                                        <MutableSelect
                                            name="yearOfEnd"
                                            placeholder="Год окончания"
                                            noOptionsMessage={"Выберите год начала"}
                                            value={item.dateEnd}
                                            startDate={item.dateStart}
                                            onChange={(e) => {
                                                mentorSettingsStore.setEducation(e, i, 'dateEnd')
                                            }}
                                        />
                                    </div>
                                    <div className="group" >
                                        <CustomAsyncSelect
                                            placeholder="Квалификация"
                                            value={item.label && item}
                                            noOptionsMessage={item.noOptionsMessage}
                                            onChange={(e) => {
                                                mentorSettingsStore.setEducation(e, i, 'qualification')
                                            }}
                                            width='30.15rem'
                                            promiseOptions={(e) => mentorSettingsStore.setQualificationOptions(e, i)}
                                        />
                                    </div>
                                    <textarea
                                        className="settings__input-group-text input textarea small"
                                        placeholder="Учебное заведение:"
                                        id="aboutMe"
                                        maxLength='100'
                                        value={item.educationalInstitution}
                                        onChange={(e) => {
                                            mentorSettingsStore.setEducation(e.target, i, 'educationalInstitution')
                                        }}
                                    />
                                </div>
                                <div className='wrapper'>
                                    <span
                                        className="settings__input-group-btn-width settings__input-group-delete"
                                        onClick={() => mentorSettingsStore.removeEducation(i)}
                                    >
                                        Удалить
                                    </span>
                                    {mentorSettingsStore.education.length - 1 === i ?
                                        <button 
                                            className="button settings__input-group-button"
                                            onClick={mentorSettingsStore.addEducation}
                                        >
                                            +
                                        </button> 
                                        : null
                                    }
                                </div>
                            </div>
                        ))}
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
                                    <MutableSelect
                                        name={"year"}
                                        placeholder="Год начала"
                                        value={experienceStart}
                                        onChange={(selectedOption) => {
                                            setExperienceStart(selectedOption.value)
                                            setExperienceEnd("")
                                        }}
                                    />
                                </div>
                                <div className="group">
                                    <MutableSelect
                                        name="yearOfEnd"
                                        placeholder="Год окончания"
                                        noOptionsMessage={"Выберите год начала"}
                                        value={experienceEnd}
                                        startDate={experienceStart}
                                        onChange={(selectedOption) => {
                                            setExperienceEnd(selectedOption.value)
                                        }}
                                    />
                                </div>
                                <textarea
                                    className="settings__input-group-text input textarea small"
                                    placeholder="Место работы:"
                                    id="aboutMe" 
                                    maxLength='100'
                                    value={experienceName}
                                    onChange={(e) => setExperienceName(e.target.value)}/>
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
                        {certificatesView()}
                        {certificates.length < 9 ? <>
                            <label htmlFor="upload-photo" className="button settings__photo-button" onClick={() => setCertificateErr(null)}>
                                Загрузить
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="upload-photo"
                                className="settings__photo-input"
                                onChange={onCertificateChange}
                            />
                            <div className={`certificates__description${certificateErr ? ' error' : ''}`}>
                                {certificateErr ? certificateErr : 'Размер файла не должен привышать 1 Мб'}
                            </div>
                        </>
                            : null}
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
                </div>
            </div>
        </form>
    )
})

export default Mentor;