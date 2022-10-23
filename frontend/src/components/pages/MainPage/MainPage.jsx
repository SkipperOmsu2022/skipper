import "../../../shared/button/button.scss"
import useAuthContext from '../../../hooks/useAuthContext'
import { Navigate } from 'react-router-dom';

const MainPage = () => {
    const { auth, setAuth } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('logged');
        setAuth(false)
    }

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