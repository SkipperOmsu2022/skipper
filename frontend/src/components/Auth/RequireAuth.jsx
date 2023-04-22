import { Navigate } from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext';

const RequireAuth = (props) => {
    const { auth } = useAuthContext();

    if (!auth) {
        return <Navigate to="/authorization/signin" relative={null} replace={true} />
    }

    return props.children
}

export default RequireAuth