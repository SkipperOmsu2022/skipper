import { useField } from "formik";

import "./input.scss"

const TextInput = ({className, ...props}) => {
    const [field, meta] = useField(props);
    
    return (
        <div className="group">
            <input {...props} {...field} className={`${className} input${meta.touched && meta.error ? " error" : ""}`}/>
                {meta.touched && meta.error ?
            (<div className="group__error">{meta.error}</div>) : null}
        </div>
    )
}

export default TextInput;