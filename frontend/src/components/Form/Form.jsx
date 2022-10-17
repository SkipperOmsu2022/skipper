import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';

const MyTextInput = ({...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="group">
            <input {...props} {...field} className="group__input"/>
                {meta.touched && meta.error ? 
            (<div className="group__error">{meta.error}</div>) : null}
        </div>
    )
};
const CustomForm = ({inputs}) => {
    function view(inputs) {
        const elements = inputs.map((item, i) => {
            const {id, name, type, placeholder} = item;

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


    return (
        <Formik
            initialValues = {{
                email: '',
                password: '',
                name: '',
                surname: ''
            }}
            validationSchema = {Yup.object({
                email: Yup.string()
                        .required('Обязательное поле')
                        .email('Неправильный email адрес'),
                password: Yup.string()
                        .required('Обязательное поле')
                        .min(10, 'Не менее 10 символов'),
                name: Yup.string()
                        .required('Обязательное поле'),
                surname: Yup.string()
                        .required('Обязательное поле'),
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            {view(inputs)}
        </Formik>
    )
}

export default CustomForm;