import "../../../shared/submitButton/button.scss"
import useService from "../../../services/loginService";
import useAuthContext from "../../../hooks/useAuthContext";
import { Navigate } from 'react-router-dom';

const MainPage = () => {
    const { logout } = useService()
    const { auth } = useAuthContext();

    if (!auth) {
        return <Navigate to="authorization/signin" replace={true} />
    }

    return (
        <div style={{'padding': '40vh'}}>
            <button onClick={logout} className="button">
                    Log out
            </button>
        </div>
    )
}

export default MainPage;