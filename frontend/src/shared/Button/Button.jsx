import Spinner from "../spinner/Spinner";

const Button = ({text, loading, ...props}) => {
    return (
        <>
            {loading ? <Spinner/> : 
            <button {...props}>
                    {text}
            </button>}
        </>
    )
}

export default Button;