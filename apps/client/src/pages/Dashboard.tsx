import { useCallback, useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import config from '../config';
import { useLoading, useNotification } from '../context/store';
import { useNavigate } from 'react-router';
import type { UserT } from '../types';

export default function Dashboard() {
    const [user, setUser] = useState<UserT>();
    const { changeLoadingStatus } = useLoading();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const getUser = useCallback(async () => {
        try {
            changeLoadingStatus(true);
            const { data } = await axios.get(`${config.baseUrl}/profile`, { withCredentials: true });
            setUser(data.data);

            changeLoadingStatus(false);
        } catch (err) {
            if (isAxiosError(err)) {
                navigate('/');
            }
        } finally {
            changeLoadingStatus(false);
        }
    }, [changeLoadingStatus, navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleClick = useCallback(async () => {
        try {
            changeLoadingStatus(true);
            await axios.post(`${config.baseUrl}/logout`, null, { withCredentials: true });
            changeLoadingStatus(false);
            setUser(undefined);
            navigate('/');
            showNotification('Log out user successful');
        } catch (err) {
            if (isAxiosError(err)) {
                navigate('/');
            }
        } finally {
            changeLoadingStatus(false);
        }
    }, [changeLoadingStatus, navigate, showNotification]);

    if (user)
        return (
            <div>
                <p>{user?.username}</p>
                <button onClick={handleClick}>log out</button>
            </div>
        );
}
