import Spinner from "../spinner/Spinner";

const Button = ({className, text, loading, ...props}) => {
    return (
        <>
            {loading ? <Spinner/> : 
            <button {...props} className={`button ${className}`}>
                {text}
            </button>}
        </>
    )
}

export default Button;