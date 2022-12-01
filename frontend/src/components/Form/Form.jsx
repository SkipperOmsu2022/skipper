import { Formik, Form } from "formik";
import * as Yup from 'yup';

import "./form.scss"
import TextInput from "../../shared/TextInput/TextInput";

const CustomForm = ({inputs, submit, id, clearResponse}) => {

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
                <TextInput
                    key={i}
                    className='group__input'
                    id={id} 
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onKeyDown={() => clearResponse(null)}/>
            )
        })
    
        return (
            <Form className="form-group" id={id}>
                {elements}
            </Form>
        )
    }

    const initial = {};
    const schema = {};

    const view = elements();
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