import "../../../shared/Button/button.scss"
import useAuthContext from '../../../hooks/authContext'
import { Navigate } from 'react-router-dom';

const MainPage = () => {
    const { auth, logout } = useAuthContext()

    if (!auth) {
        return <Navigate to="/" replace={true} />
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