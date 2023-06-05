import { Navigate, useNavigate } from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext';

const RequireAuth = (props) => {
    const { auth } = useAuthContext();

    if (!auth) {
        return <Navigate to="/authorization/signin" relative={null} replace={true} />
    }

    return props.children
}

const useRequireAuth = (callback) => {
    const { auth: userId } = useAuthContext();
    const navigate = useNavigate();

    if (userId) {
        return callback;
    } else {
        return () => navigate("/authorization/signin", { relative: null, replace: true });
    }
}

export default RequireAuth
export {useRequireAuth}