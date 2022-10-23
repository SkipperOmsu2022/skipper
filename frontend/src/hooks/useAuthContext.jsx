import { useContext } from 'react';
import { AuthContext } from '../components/Auth/AuthProvider';

export default function useAuthContext() {
    const authContext = useContext(AuthContext)
    return authContext
}