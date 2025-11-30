import { useNavigate } from 'react-router';
import { useLoading, useNotification } from '../context/store';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { VerifyUserT } from '../types';
import { useCallback, useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import config from '../config';
import FormLayout from '../layout/FormLayout';
import { TextField } from '@mui/material';

type verifyUserProps = {
    email: string;
    token: string;
};

export default function VerifyUser() {
    // * get parameters if they exist
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    const navigate = useNavigate();
    const { changeLoadingStatus } = useLoading();
    const { showNotification } = useNotification();
    const { handleSubmit, register } = useForm<VerifyUserT>();
    const [apiMessageResponse, setApiMessageResponse] = useState<string>('');

    const verifyUser = useCallback(
        async (body: verifyUserProps) => {
            {
                try {
                    changeLoadingStatus(true);
                    await axios.post(`${config.baseUrl}/validateUser`, body);
                    navigate('/');
                    showNotification('The user was successfully verified.');
                    changeLoadingStatus(false);
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.response?.data);
                        return setApiMessageResponse(error.response?.data?.message ?? 'Something went wrong');
                    } else {
                        setApiMessageResponse('Unexpected error');
                    }
                } finally {
                    changeLoadingStatus(false);
                }
            }
        },
        [navigate, changeLoadingStatus, showNotification]
    );

    useEffect(() => {
        if (email && token) {
            (async () => await verifyUser({ email, token }))();
        }
    }, [email, token, verifyUser]);

    const onSubmit: SubmitHandler<VerifyUserT> = async (data) => {
        await verifyUser(data);
    };

    return (
        <FormLayout>
            <form className="flex flex-col items-center gap-5 lg:w-full" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="mb-2 text-4xl font-bold">TaskPodoro</h2>
                <h3 className="mb-15 text-2xl font-light">Verify user</h3>

                <TextField
                    variant="standard"
                    type="email"
                    disabled={email ? true : false}
                    value={email}
                    className="mb-10 flex h-15 justify-center self-stretch rounded bg-[#e2e2e2]"
                    inputProps={{ style: { textAlign: 'center' } }}
                    InputProps={{ disableUnderline: true }}
                    {...register('email', {
                        required: { value: true, message: 'Email is required' },
                    })}
                />

                <TextField
                    type="text"
                    className="m-auto mx-auto flex h-20 w-50"
                    placeholder="______"
                    inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: 15, letterSpacing: 16 } }}
                    {...register('token', {
                        required: { value: true, message: 'Token is required' },
                        pattern: { value: /^\d+$/, message: 'Only numbers allowed' },
                        maxLength: { value: 6, message: 'Only numbers allowed' },
                    })}
                    error={!!apiMessageResponse}
                    helperText={apiMessageResponse}
                />

                <input
                    type="submit"
                    className="bg-secondary-500 mt-5 h-13 cursor-pointer self-stretch rounded text-white transition hover:scale-105"
                />
            </form>
        </FormLayout>
    );
}
