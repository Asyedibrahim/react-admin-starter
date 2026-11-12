import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentUser } = useSelector((state: RootState) => state.user);

    return currentUser?.role ? <Outlet /> : <Navigate to="/" replace />;
}