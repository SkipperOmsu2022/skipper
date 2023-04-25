import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { MultipleSelect, MutableSelect, CustomAsyncSelect} from "../../../shared/customSelect/CustomSelect";
import mentorSettingsStore from "../../../store/mentorSettingsStore";

import useSpecializationService from "../../../services/SpecializationService";

import cross from "../../../resources/icons/cross.svg"
import "../../../shared/switch.scss"

const Mentor = observer(() => {
    const {getUserData, setUserData, clearResponse} = useOutletContext();
    const {getSpecializationsList} = useSpecializationService();

    useEffect(() => {
        mentorSettingsStore.resetStore();
        getSpecializationsList()
            .then(res => mentorSettingsStore.setSpecializationOptions(res))
            .then(() => getUserData('user/profile/settings/mentor/'))
            .then(res => mentorSettingsStore.setMentorData(res))
        
        return () => clearResponse();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        clearResponse();
        if (mentorSettingsStore.validate()) {
            const form_data = await mentorSettingsStore.formPostData();

            setUserData(
                form_data,
                'user/profile/settings/mentor/',
                {'Content-Type':'multipart/form-data' }
            );
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
                <MentorEducations/>
                <MentorExperiences/>
                <MentorCertificates/>
            </div>
        </form>
    )
})

const MentorEducations = observer(() => {
    return (
        <div className="settings__input-group">
            <label className="settings__input-group-label middle-top-padding">
                Образование: 
            </label>
            <div className="education-group">
                {mentorSettingsStore.educations.length ? null :
                    <button className="button settings__input-group-button" onClick={mentorSettingsStore.addEducation}>
                        +
                    </button>
                }
                {mentorSettingsStore.educations.map((item, i) => (
                    <div className="education" key={item.id}>
                        <div className="settings__input-group-box">
                            <div className="group">
                                <MutableSelect
                                    name="year"
                                    placeholder="Год начала"
                                    value={item.yearStart + ''}
                                    onChange={(e) => {
                                        mentorSettingsStore.setEducation(e, i, 'yearStart')
                                    }}
                                    error={item.error[0] && mentorSettingsStore.dirty}
                                />
                            </div>
                            <div className="group">
                                <MutableSelect
                                    name="yearOfEnd"
                                    placeholder="Год окончания"
                                    noOptionsMessage={"Выберите год начала"}
                                    value={item.yearEnd}
                                    startDate={item.yearStart}
                                    onChange={(e) => {
                                        mentorSettingsStore.setEducation(e, i, 'yearEnd')
                                    }}
                                    error={item.error[0] && mentorSettingsStore.dirty}
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
                                    promiseOptions={(e) => mentorSettingsStore.asyncGetQualificationOptions(e, i)}
                                    error={item.error[1] && mentorSettingsStore.dirty}
                                />
                            </div>
                            <div className="textarea-wrapper group">
                                <textarea
                                    className={`settings__input-group-text input textarea small
                                        ${item.error[2] && mentorSettingsStore.dirty ? 'error' : ''}`}
                                    placeholder="Учебное заведение:"
                                    id={`educations${i}`}
                                    maxLength='100'
                                    value={item.educationalInstitution}
                                    onChange={(e) => {
                                        mentorSettingsStore.setEducation(e.target, i, 'educationalInstitution')
                                    }}
                                />
                            </div>
                            {item.error.includes(true) && mentorSettingsStore.dirty ? 
                                <div className="group-error">Заполните все поля</div>
                                :null
                            }
                        </div>
                        <div className='wrapper'>
                            <span
                                className="settings__input-group-btn-width settings__input-group-delete"
                                onClick={() => mentorSettingsStore.removeEducation(i)}
                            >
                                Удалить
                            </span>
                            {mentorSettingsStore.educations.length - 1 === i ?
                                <button
                                    className={`button settings__input-group-button 
                                        ${item.error.includes(true) && mentorSettingsStore.dirty ? 'mrgn-btm' : ''}`}
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
    )
})

const MentorExperiences = observer(() => {
    return (
        <div className="settings__input-group">
            <label className="settings__input-group-label middle-top-padding">
                Опыт работы: 
            </label>
            <div className="experience-group">
                {mentorSettingsStore.workExperiences.length ? null :
                    <button className="button settings__input-group-button" onClick={mentorSettingsStore.addExperience}>
                        +
                    </button>
                }
                {mentorSettingsStore.workExperiences.map((item, i) => (
                    <div className="experience" key={item.id}>
                        <div className="settings__input-group-box">
                        <div className="group">
                                <MutableSelect
                                    name={"year"}
                                    placeholder="Год начала"
                                    value={item.yearStart + ''}
                                    onChange={(e) => {
                                        mentorSettingsStore.setExperience(e, i, 'yearStart')
                                    }}
                                    error={item.error[0] && mentorSettingsStore.dirty}
                                />
                            </div>
                            <div className="group">
                                <MutableSelect
                                    name="yearOfEnd"
                                    placeholder="Год окончания"
                                    noOptionsMessage={"Выберите год начала"}
                                    value={item.yearEnd}
                                    startDate={item.yearStart}
                                    onChange={(e) => {
                                        mentorSettingsStore.setExperience(e, i, 'yearEnd')
                                    }}
                                    error={item.error[0] && mentorSettingsStore.dirty}
                                />
                            </div>
                            <div className="textarea-wrapper group">
                                <textarea
                                    className={`settings__input-group-text input textarea small
                                        ${item.error[1] && mentorSettingsStore.dirty ? 'error' : ''}`}
                                    placeholder="Место работы:"
                                    id={`workExperiences${i}`} 
                                    maxLength='100'
                                    value={item.placeOfWork}
                                    onChange={(e) => {
                                        mentorSettingsStore.setExperience(e.target, i, 'placeOfWork')
                                    }}
                                />
                            </div>
                            {item.error.includes(true) && mentorSettingsStore.dirty ? 
                                <div className="group-error">Заполните все поля</div>
                                :null
                            }
                        </div>
                        <div className='wrapper'>
                            <span
                                className="settings__input-group-btn-width settings__input-group-delete"
                                onClick={() => mentorSettingsStore.removeExperience(i)}
                            >
                                Удалить
                            </span>
                            {mentorSettingsStore.workExperiences.length - 1 === i ?
                                <button
                                    className={`button settings__input-group-button 
                                        ${item.error.includes(true) && mentorSettingsStore.dirty ? 'mrgn-btm' : ''}`}
                                    onClick={mentorSettingsStore.addExperience}
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
    )
})

const MentorCertificates = observer(() => {
    const onCertificatesChange = (e) => {
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
                mentorSettingsStore.setCertificatesErr("Неправильный формат файла");
                return;
            } else if (file.size > 1048576 * 2.5){
                mentorSettingsStore.setCertificatesErr("Слишком большой файл");
                return;
            }

			reader.onload = () => {
				mentorSettingsStore.addCertificate(reader.result?.toString());
				e.target.value = null;
			};

			reader.readAsDataURL(file);
		} catch (error) {
			console.log(error);
		}
    };

    return (
        <>
            <div className="settings__input-group">
                <label htmlFor="upload-photo" className="settings__input-group-label middle-top-padding">
                    Сертификаты:
                </label>
                <div className="certificates">
                    <div className="certificates__group">
                        {mentorSettingsStore.certificates.map((item, i) => (<div className="certificates__group-item" key={i}>
                                <div className="img-wrapper">
                                    <img src={item} alt="certificate" className="certificates__group-item-image"/>
                                    <img src={cross} alt="certificate" className="certificates__group-item-cross"
                                        onClick={() => mentorSettingsStore.removeCertificate(i)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    {mentorSettingsStore.certificates.length < 4 ? 
                        <>
                            <label 
                                htmlFor="upload-photo"
                                className="button settings__photo-button"
                                onClick={mentorSettingsStore.removeCertificatesErr}
                            >
                                Загрузить
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="upload-photo"
                                className="settings__photo-input"
                                onChange={onCertificatesChange}
                            />
                            <div className={`certificates__description${mentorSettingsStore.certificatesErr ? ' error' : ''}`}>
                                {mentorSettingsStore.certificatesErr ? mentorSettingsStore.certificatesErr : 'Размер файла не должен привышать 2.5 Мб'}
                            </div>
                        </>
                        : null
                    }
                </div>
            </div>
        </>
    )
})

export default Mentor;