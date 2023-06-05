import { useOutletContext } from "react-router-dom";
import { useState, useEffect} from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import TextInput from "../../../shared/TextInput/TextInput";
import { api } from "../../../services/api";

const Account = () => {
    const {setUserData, clearResponse} = useOutletContext();

    const [initial, setInitial] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    });

    useEffect(() => {
        setInitial({
            email: '',
            oldPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        })
        return () => clearResponse();
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues = {initial}
            validationSchema = {Yup.object().shape(({
                email: Yup.string()
                        .required('Обязательное поле')
                        .email('Неправильный email адрес'),
                oldPassword: Yup.string()
                        .required('Обязательное поле'),
                newPassword: Yup.string()
                        .required('Обязательное поле')
                        .when("oldPassword", {
                            is: oldPassword => (oldPassword && oldPassword.length > 0 ? true : false),
                            then: Yup.string()
                                .required('Выберите новый пароль')
                                .notOneOf([Yup.ref("oldPassword")], "Старый и новый пароли не должны совпадать")
                        })
                        .min(8, 'Пароль должен быть не менее 8 символов'),
                repeatNewPassword: Yup.string()
                        .required('Обязательное поле')
                        .when("newPassword", {
                            is: newPassword => (newPassword && newPassword.length > 0 ? true : false),
                            then: Yup.string().oneOf([Yup.ref("newPassword")], "Повторите новый пароль")
                        }),
            }), ['oldPassword', 'newPassword', 'repeatNewPassword'])}
            onSubmit = {(data, actions) => {
                setUserData(data, api.userAccount);
                actions.setTouched({}, false);
            }}
        >
            {({values, setFieldValue}) => {
                if(!values.newPassword && values.repeatNewPassword) setFieldValue('repeatNewPassword', '')
                return (
                    <Form className="settings__column" id="contact-form">
                        <div className="settings__header">
                            НАСТРОЙКИ АККАУНТА
                        </div>
                        <div className="settings__input-group first-group-padding">
                                <label htmlFor="email" className="settings__input-group-label low-top-padding">
                                    Email: 
                                </label>
                                <TextInput
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='Введите вашу электронную почту'
                                    className="settings__input-group-text long-input"
                                />
                                <button className="button settings__input-group-button settings__input-group-btn-wide">
                                    Подтвердить
                                </button>
                        </div>
                        <div className="settings__input-group">
                            <label htmlFor="old-password" className="settings__input-group-label high-top-padding">
                                Смена пароля:
                            </label>
                            <div className="settings__password">
                                <div className="settings__input-group">
                                    <TextInput
                                        id='oldPassword'
                                        name='oldPassword'
                                        type='password'
                                        placeholder='Старый пароль'
                                        className="settings__input-group-text long-input"
                                    />
                                    <a  href="адрес" className="forgot-password">Забыли пароль?</a>
                                </div>
                                <TextInput
                                    id='newPassword'
                                    name='newPassword'
                                    type='password'
                                    placeholder='Новый пароль'
                                    className="settings__input-group-text long-input"
                                />
                                <TextInput
                                    id='repeatNewPassword'
                                    name='repeatNewPassword'
                                    type='password'
                                    placeholder='Повторите новый пароль'
                                    className="settings__input-group-text long-input"
                                    disabled={!values.newPassword}
                                />
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Account;