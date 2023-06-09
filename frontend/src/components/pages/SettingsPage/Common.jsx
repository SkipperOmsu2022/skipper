import enviroments from "../../../config/enviroments";
import { useOutletContext } from "react-router-dom";
import { useState, useRef, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FormikSelect } from "../../../shared/customSelect/CustomSelect";
import ImageCropper from "../../ImageCropper/ImageCropper";

import photo from "../../../resources/profile-photo.jpg"
import "../../../shared/radio.scss"
import "../../../shared/submitButton/button.scss"

import TextInput from "../../../shared/TextInput/TextInput";
import { api } from "../../../services/api";

async function getBlobFromUrl(url) {
    return await fetch(url).then(r => r.blob());
}

const Common = () => {
    const {getUserData, setUserData, clearResponse} = useOutletContext();

    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [imgErr, setImgErr] = useState(null);
    const [croppedImg, setCroppedImg] = useState(null);
    const [aboutMe, setAboutMe] = useState("");

    const [initial, setInitial] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        day: '',
        month: '',
        year: '',
        gender: ''
    });

    useEffect(() => {
        getUserData(api.userSettings)
            .then(res => {
                let date = res?.data?.dateOfBirth?.split('-');
                if (date === undefined) date = ['', '', ''];
                
                if (res?.data?.imageUserResource) {
                    setImage(enviroments.apiBase + res?.data?.imageUserResource)
                } else {
                    setImage(null)
                }
                
                setInitial({
                    firstName: res?.data?.firstName,
                    lastName: res?.data?.lastName,
                    patronymic: res?.data?.patronymic || '',
                    day: date[2],
                    month: date[1],
                    year: date[0],
                    gender: res?.data?.gender || '' 
                });
                setAboutMe(res?.data?.aboutMe || '')
            });

            document.addEventListener("keydown", clearResponse);

        return () => {
            clearResponse();
            document.removeEventListener("keydown",  clearResponse);
        };
    }, []);

    useEffect(() => {
        if (croppedImg) {
            setImage(URL.createObjectURL(croppedImg));
        }
    }, [croppedImg])

    const fileInput = useRef(1);

    const onImageChange = (e) => {
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
                setImgErr("Неправильный формат файла");
                return;
            } else if (file.size > 3145728){
                setImgErr("Слишком большой файл");
                return;
            }

			reader.onload = () => {
                setImgErr(null);
				setCurrentImage(reader.result?.toString());
				e.target.value = null;
				setShowModal(true);
			};

			reader.readAsDataURL(file);
		} catch (error) {
			console.log(error);
		}
    };

    const onDeletePhoto = () => {
        setCroppedImg(null)
        setCurrentImage(null)
        setImage(null)
    }

    function isValidDate(day, month, year) {
        if (day && month && year) {
            let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

            if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
                monthLength[1] = 29;
    
            return day <= monthLength[month - 1];
        } else {
            return true;
        }
    };

    const onSubmit = async ({firstName, lastName, patronymic, day, month, year, gender}) => {
        const dateOfBirth = [year, month, day].join('-');
        const data = {firstName, lastName, patronymic, dateOfBirth, aboutMe, gender}
        let form_data = new FormData();

        if (croppedImg) {
            form_data.append('file', croppedImg, 'filename.png');
        } else if (image) {
            await getBlobFromUrl(image).then(res => form_data.append('file', res, 'filename.png'));
        }

        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        
        setUserData(form_data, api.userSettings, {"Content-Type": 'multipart/form-data'});
    }
    
    return (
        <>
            <ImageCropper
                showModal={showModal}
                imgURL={currentImage}
                onSaveHandler={setCroppedImg}
                onModalClose={() => {
                    setShowModal(false);
                }}
            />
            <Formik
                enableReinitialize
                initialValues = {initial}
                validationSchema = {Yup.object({
                    firstName: Yup.string()
                            .required('Обязательное поле'),
                    lastName: Yup.string()
                            .required('Обязательное поле'),
                    day: Yup.number().required('Обязательное поле'),
                    month: Yup.number().required('Обязательное поле'),
                    year: Yup.number().required('Обязательное поле'),
                    gender: Yup.string()
                            .required('Обязательный параметр')
                })}
                onSubmit = {onSubmit}
            >
                {({ errors, setFieldValue, handleChange, touched, handleBlur, values, isValid}) => {
                    if (!isValidDate(values.day, values.month, values.year)) {
                        errors.day = "Такой даты не существует"
                    } else if (values.day && errors?.day) {
                        delete errors['day'];
                    }
                    return (
                        <Form className="settings__column" id="contact-form">
                            <div className="settings__header">
                                ОБЩАЯ ИНФОРМАЦИЯ
                            </div>    
                            <div className="settings__photo">
                                <div className="img-wrapper">
                                    <img className="settings__photo-img user-photo" src={image || photo} alt="" />
                                    <div alt="delete" className="settings__photo-cross" onClick={onDeletePhoto}>
                                        <span className="transform">Х</span>
                                    </div>
                                </div>
                                <div className="settings__photo-text">
                                    <div className="settings__photo-header">
                                        Добавьте фото своего профиля
                                    </div>
                                    <div className={`settings__photo-description${imgErr ? ' error' : ''}`}>
                                        {imgErr ? imgErr : 'Размер фотографии не должен превышать 3Мб (JPG, GIF или PNG)'}
                                    </div>
                                </div>
                                <label htmlFor="upload-photo" className="button settings__photo-button">
                                    Изменить
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    id="upload-photo"
                                    className="settings__photo-input"
                                    onChange={onImageChange}
                                    ref={fileInput}
                                />
                            </div>
                            <div className="settings__input-group">
                                <label htmlFor="firstName" className="settings__input-group-label middle-top-padding">
                                    Полное имя: 
                                </label>
                                <TextInput
                                    id='firstName'
                                    name='firstName'
                                    type='text'
                                    placeholder='Фамилия'
                                    className="settings__input-group-text"
                                />
                                <TextInput
                                    id={'lastName'} 
                                    name={'lastName'}
                                    type={'text'}
                                    placeholder={'Имя'}
                                    className="settings__input-group-text"
                                />
                                <TextInput
                                    id={'patronymic'} 
                                    name={'patronymic'}
                                    type={'text'}
                                    placeholder={'Отчество'}
                                    className="settings__input-group-text"
                                />
                            </div>
                            <div className="settings__input-group">
                                <label className="settings__input-group-label middle-top-padding">
                                    Дата рождения: 
                                </label>
                                <div className="group">
                                    <FormikSelect
                                        name={"day"}
                                        placeholder="День"
                                        error={touched.day && errors.day}
                                        value={values.day}
                                        onChange={(selectedOption) => {
                                            clearResponse();
                                            setFieldValue("day", selectedOption.value)
                                            handleChange("day");
                                        }}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="group">
                                    <FormikSelect
                                        name={"month"}
                                        placeholder="Месяц"
                                        error={touched.month && errors.month}
                                        value={values.month}
                                        onChange={(selectedOption) => {
                                            clearResponse();
                                            setFieldValue("month", selectedOption.value)
                                            handleChange("month");
                                        }}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="group">
                                    <FormikSelect
                                        name={"year"}
                                        placeholder="Год"
                                        error={touched.year && errors.year}
                                        value={values.year}
                                        onChange={(selectedOption) => {
                                            clearResponse();
                                            setFieldValue("year", selectedOption.value)
                                            handleChange("year");
                                        }}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                            <div className="settings__input-group">
                                <label className="settings__input-group-label radio-label">
                                    Пол: 
                                </label>
                                <Field
                                    className="radio"
                                    type="radio"
                                    name="gender"
                                    value="MALE"
                                    id="MALE"
                                />
                                <label
                                    className="radio-name"
                                    htmlFor="MALE"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === ' ' || e.key === "Enter") {
                                            setFieldValue("gender", "MALE");
                                        }
                                    }}
                                >
                                    мужской
                                </label>
                                <Field
                                    className="radio"
                                    type="radio"
                                    name="gender"
                                    value="FEMALE"
                                    id="FEMALE"
                                />
                                <label
                                    className="radio-name"
                                    htmlFor="FEMALE"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === ' ' || e.key === "Enter") {
                                            setFieldValue("gender", "FEMALE");
                                        }
                                    }}
                                >
                                    женский
                                </label>
                                <ErrorMessage className="group__error" name="gender" component="div"/>
                            </div>
                            <div className="settings__input-group">
                                <label htmlFor="aboutMe" className="settings__input-group-label middle-top-padding">
                                    О себе: 
                                </label>
                                <textarea className="settings__input-group-text input textarea high" placeholder="Расскажите немного о себе:"
                                    id="aboutMe" maxLength='400' value={aboutMe} onChange={(e) => {
                                        clearResponse();
                                        setAboutMe(e.target.value)
                                    }}/>
                            </div>
                        </Form>
                    )}}
            </Formik>
        </>
    )
}

export default Common;