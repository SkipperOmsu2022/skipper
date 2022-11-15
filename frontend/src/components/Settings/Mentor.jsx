import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import TextInput from "../../shared/TextInput/TextInput";
import "../../shared/switch.scss"
import CustomFormikSelect, {CustomMutableSelect} from "../../shared/customSelect/CustomSelect";

const Mentor = () => {
    const [mentor, setMentor] = useState(false);
    const [aboutMe, setAboutMe] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [showSwitchMsg, setShowSwitchMsg] = useState(true);

    const [educationStart, setEducationStart] = useState("");
    const [educationEnd, setEducationEnd] = useState("");
    const [qualification, setQualification] = useState("");
    const [specialization, setSpecialization] = useState("");

    const [experienceStart, setExperienceStart] = useState("");
    const [experienceEnd, setExperienceEnd] = useState("");
    const [experienceName, setExperienceName] = useState("");
    
    const [certificates, setCertificates] = useState([]);
    const [certificateErr, setCertificateErr] = useState(false);

    const [otherInformation, setOtherInformation] = useState("");

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

    function view() {
        const elements = certificates.map((item, i) => {
            return (
                <div className="certificates__group-item" key={i}>
                    <img src={item} alt="certificate" className="certificates__group-item-image"
                        onClick={() => onDeleteCertificate(i)}/>
                </div>
            )
        })
    
        return (
            <div className="certificates__group">
                {elements}
            </div>
        )
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
    
    return (
        <form id="contact-form">
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
                                        value={educationStart}
                                        onChange={(selectedOption) => {
                                            setEducationStart(selectedOption.label)
                                            setEducationEnd("")
                                        }}
                                    />
                                </div>
                                <div className="group">
                                    <CustomMutableSelect
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
                                <textarea
                                    className="settings__input-group-text input textarea small"
                                    placeholder="Добавьте свою специализацию:"
                                    id="aboutMe"
                                    maxLength='100'
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}/>
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
                                    <CustomMutableSelect
                                        name={"year"}
                                        placeholder="Год начала"
                                        value={experienceStart}
                                        onChange={(selectedOption) => {
                                            setExperienceStart(selectedOption.label)
                                            setExperienceEnd("")
                                        }}
                                    />
                                </div>
                                <div className="group">
                                    <CustomMutableSelect
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
                        {view()}
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
        </form>
    )
}

export default Mentor;