import { useState, useEffect} from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import TextInput from "../../shared/TextInput/TextInput";

const Account = () => {
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
        });
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues = {initial}
            validationSchema = {Yup.object({
                email: Yup.string()
                        .required('Обязательное поле')
                        .email('Неправильный email адрес'),
                oldPassword: Yup.string()
                        .required('Обязательное поле'),
                newPassword: Yup.string()
                        .required('Обязательное поле')
                        .min(8, 'Пароль должен быть не менее 8 символов'),
                confirmPassword: Yup.string()
                        .required('Обязательное поле')
                        .when("newPassword", {
                            is: newPassword => (newPassword && newPassword.length > 0 ? true : false),
                            then: Yup.string().oneOf([Yup.ref("newPassword")], "Пароли не совпадают")
                        }),
            })}
            onSubmit = {(data) => {
                console.log(data);
            }}
        >
            <Form className="settings__column">
                <div className="settings__header">
                    НАСТРОЙКИ АККАУНТА
                </div>
                <div className="settings__input-group">
                        <label htmlFor="email" className="settings__input-group-label">
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
                    <label htmlFor="old-password" className="settings__input-group-label high-block-label">
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