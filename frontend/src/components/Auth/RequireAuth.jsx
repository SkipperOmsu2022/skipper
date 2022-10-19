import { Navigate } from 'react-router-dom'

const RequireAuth = (props) => {
    const auth = true

    if (!auth) {
        return <Navigate to="/"/>
    }

    return props.children
}

export default RequireAuth