import { useOutletContext } from "react-router-dom";
import { useState, useEffect} from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import TextInput from "../../shared/TextInput/TextInput";

const Account = () => {
    const {setAccountData} = useOutletContext();

    const [initial, setInitial] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        setInitial({
            email: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues = {initial}
            validationSchema = {Yup.object().shape(({
                email: Yup.string()
                        .email('Неправильный email адрес'),
                oldPassword: Yup.string()
                        .when("newPassword", {
                            is: newPassword => (newPassword && newPassword.length > 0 ? true : false),
                            then: Yup.string().required('Подтвердите, что являетесь владельцем аккаунта')
                        }),
                newPassword: Yup.string()
                        .when("oldPassword", {
                            is: oldPassword => (oldPassword && oldPassword.length > 0 ? true : false),
                            then: Yup.string().required('Выберите новый пароль')
                        })
                        .min(8, 'Пароль должен быть не менее 8 символов')
                        .when("oldPassword", {
                            is: oldPassword => (oldPassword && oldPassword.length > 0 ? true : false),
                            then: Yup.string().notOneOf([Yup.ref("oldPassword")], "Старый и новый пароли не должны совпадать")
                        }),
                confirmPassword: Yup.string()
                        .when("oldPassword", {
                            is: oldPassword => (oldPassword && oldPassword.length > 0 ? true : false),
                            then: Yup.string().required('Обязательное поле')
                        })
                        .when("newPassword", {
                            is: newPassword => (newPassword && newPassword.length > 0 ? true : false),
                            then: Yup.string().oneOf([Yup.ref("newPassword")], "Повторите новый пароль")
                        }),
            }), ['oldPassword', 'newPassword'])}
            onSubmit = {(data, actions) => {
                setAccountData(data);
                actions.setTouched({}, false);
            }}
        >
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
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            placeholder='Повторите новый пароль'
                            className="settings__input-group-text long-input"
                        />
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default Account;