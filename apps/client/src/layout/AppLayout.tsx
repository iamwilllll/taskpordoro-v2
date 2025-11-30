import { Outlet } from 'react-router';
import GlobalModal from '../components/GlobalModal';

export default function AppLayout() {
    return (
        <>
            <GlobalModal />
            <Outlet />
        </>
    );
}
