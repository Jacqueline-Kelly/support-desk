import { Navigate, Outlet } from 'react-router-dom'
import Spinner from './Spinner'
import { UseAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = UseAuthStatus()

    if(checkingStatus) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute