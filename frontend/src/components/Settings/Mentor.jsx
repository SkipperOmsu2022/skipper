import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import useSpecializationService from "../../services/SpecializationService";
import cross from "../../resources/icons/cross.svg"
import "../../shared/switch.scss"
import {MutableSelect, MultipleSelect} from "../../shared/customSelect/CustomSelect";

const Mentor = () => {
    const {getUserData, setUserData, clearResponse} = useOutletContext();
    const {getSpecializationsList} = useSpecializationService();
    const [mentor, setMentor] = useState(false);
    const [aboutMe, setAboutMe] = useState("");
    const [specializationOptions, setSpecializationOptions] = useState("");
    
    const [mentorSpecializations, setMentorSpecializations] = useState([]);

    /* const specializationOptions = [
        { value: 'JOURNALISTIC_ACTIVITY', label: 'Журналистская деятельность' },
        { value: 'TESTING_SOFTWATE', label: 'Тестирование' },
        { value: 'STOCK_MARKET', label: 'Фондовый рынок' },
        { value: 'BUSINESS_ANALYTICS', label: 'Бухгалтерия' },
        { value: 'ADMINISTRATION_SOFTWARE', label: 'Администрирование' },
        { value: 'PROGRAMMING', label: 'Программирование' },
        { value: 'JURISPRUDENCE', label: 'Юриспруденция' },
        { value: 'ACCOUNTING', label: 'Налоги' },
        { value: 'DEV_OPS', label: 'DevOps' },
        { value: 'SCHOOL_EDUCATION', label: 'Школьное образование' }
    ] */

    const [educationStart, setEducationStart] = useState("");
    const [educationEnd, setEducationEnd] = useState("");
    const [qualification, setQualification] = useState("");

    const [experienceStart, setExperienceStart] = useState("");
    const [experienceEnd, setExperienceEnd] = useState("");
    const [experienceName, setExperienceName] = useState("");
    
    const [certificates, setCertificates] = useState([]);
    const [certificateErr, setCertificateErr] = useState(false);

    useEffect(() => {
        getSpecializationsList()
            .then(res => 
                setSpecializationOptions(Object.entries(res)?.map((item) => {
                    const obj = {value: item[0], label: item[1]}
                    return obj
                }))
            );
        getUserData('user/profile/settings/mentor/')
            .then(res => {
                setMentor(res?.data?.isEnabledMentorStatus || false);
                setAboutMe(res?.data?.aboutMeAsMentor || '');
                setMentorSpecializations(res?.data?.mentorSpecializations?.map((item) => 
                    specializationOptions.find(option => option.value === item)
                ) || '');
            });
        return () => clearResponse();
    }, []);
    console.log(specializationOptions)
    const switchMessage = mentor ? 
        <div className="state">
            <span className="active">Активный</span>
        </div> : 
        <div className="state">
            <span className="inactive">Неактивный</span>
            <div className="message">
                (Для активации заполните поля "О себе" и "Специальность")
            </div>
        </div>;

    const handleSwitchChange = () => {
        if(mentor && aboutMe && mentorSpecializations.length) {
            setMentor(false)
        } else if (aboutMe && mentorSpecializations.length) {
            setMentor(true)
        }
    }
    const handleAboutMeChange = (e) => {
        setAboutMe(e.target.value)
        if (!e.target.value || !mentorSpecializations.length) {
            setMentor(false)
        }
    }
    const handleSpecializationChange = (e) => {
        console.log(e?.length); 
        setMentorSpecializations(Array.isArray(e) ? e : [])
        if (!aboutMe || e?.length === 0) {
            setMentor(false)
        }
    }

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
    
    return (
        <form 
            id="contact-form" 
            onSubmit={(e) => {
                e.preventDefault();
                setUserData({
                    isEnabledMentorStatus: mentor,
                    aboutMeAsMentor: aboutMe,
                    mentorSpecializations: mentorSpecializations.map((item) => item.value)
                }, 'user/profile/settings/mentor/');
            }}>
            <div className="settings__column">
                <div className="settings__header">
                    НАСТРОЙКИ МЕНТОРА
                </div>
                <div className="settings__input-group first-group-padding">
                        <label htmlFor="switch" className="settings__input-group-label">
                            Текущий статус:
                        </label>
                        <label className={`switch ${aboutMe && mentorSpecializations.length ? "" : "msg"}`}>
                                <input
                                    id="switch"
                                    className="switch__input"
                                    type="checkbox"
                                    disabled={!aboutMe || !mentorSpecializations.length}
                                    checked={mentor}
                                    onChange={handleSwitchChange}/>
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
                        <div className="group">
                            <MultipleSelect
                                placeholder="Добавьте свою специализацию"
                                value={mentorSpecializations}
                                multipleOptions={specializationOptions}
                                noOptionsMessage='Специальностей не найдено'
                                onChange={handleSpecializationChange}
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
                        <div className="education">
                            <div className="settings__input-group-box">
                                <div className="group">
                                    <MutableSelect
                                        name="year"
                                        placeholder="Год начала"
                                        value={educationStart}
                                        onChange={(selectedOption) => {
                                            setEducationStart(selectedOption.value)
                                            setEducationEnd("")
                                        }}
                                    />
                                </div>
                                <div className="group">
                                    <MutableSelect
                                        name="yearOfEnd"
                                        placeholder="Год окончания"
                                        noOptionsMessage={"Выберите год начала"}
                                        value={educationEnd}
                                        startDate={educationStart}
                                        onChange={(selectedOption) => {
                                            setEducationEnd(selectedOption.value)
                                        }}
                                    />
                                </div>
                                <div className="group" >
                                    <MutableSelect
                                        name="qualification"
                                        placeholder="Квалификация"
                                        value={qualification}
                                        onChange={(selectedOption) => {
                                            setQualification(selectedOption.value)
                                        }}
                                        width='30.15rem'
                                    />
                                </div>
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
}

export default Mentor;