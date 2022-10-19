import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';

import "./form.scss"

const MyTextInput = ({...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="group">
            <input {...props} {...field} className={`group__input${meta.touched && meta.error ? " error" : ""}`}/>
                {meta.touched && meta.error ?
            (<div className="group_error">{meta.error}</div>) : null}
        </div>
    )
};
const CustomForm = ({inputs, submit}) => {

    function elements() {
        const elements = inputs.map((item, i) => {
            const {id, name, type, placeholder} = item;

            switch(name) {
                case 'email':
                    initial['email'] = '';
                    schema['email'] = Yup.string()
                        .required('Обязательное поле')
                        .email('Неправильный email адрес');
                    break;
                case 'password':
                    initial['password'] = '';
                    schema['password'] = Yup.string()
                        .required('Обязательное поле')
                        .min(8, 'Пароль должен быть не менее 8 символов')
                    break;
                case 'firstName':
                    initial['firstName'] = '';
                    schema['firstName'] = Yup.string()
                        .required('Обязательное поле')
                    break;
                case 'lastName':
                    initial['lastName'] = '';
                    schema['lastName'] = Yup.string()
                        .required('Обязательное поле')
                    break;
                default:
                    break;
            }

            return (
                <MyTextInput
                    key={i}
                    id={id} 
                    name={name}
                    type={type}
                    placeholder={placeholder}/>
            )
        })
    
        return (
            <Form className="form-group" id="contact-form">
                {elements}
            </Form>
        )
    }

    const initial = {};
    const schema = {};

    const view = elements(inputs);

    return (
        <Formik
            initialValues = {initial}
            validationSchema = {Yup.object(schema)}
            onSubmit = {values => submit(values)}
        >
            {view}
        </Formik>
    )
}

export default CustomForm;