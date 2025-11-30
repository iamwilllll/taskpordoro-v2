import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { LoginT } from '../types';
import { useLoading, useNotification } from '../context/store';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import config from '../config';
import { TextField } from '@mui/material';
import FormLayout from '../layout/FormLayout';

export default function Login() {
    const [apiMessageResponse, setApiMessageResponse] = useState<string>('');
    const { handleSubmit, register, formState, reset } = useForm<LoginT>();
    const { errors } = formState;

    const { showNotification } = useNotification();
    const { changeLoadingStatus } = useLoading();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginT> = async (data) => {
        const { email, password } = data;

        try {
            changeLoadingStatus(true);
            await axios.post(
                `${config.baseUrl}/login`,
                { email: email.toLocaleLowerCase(), password },
                { withCredentials: true }
            );
            reset();
            changeLoadingStatus(false);
            showNotification('Login successful');
            navigate('/dashboard');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
                setApiMessageResponse(error.response?.data?.message ?? 'Something went wrong');
            } else {
                setApiMessageResponse('Unexpected error');
            }
        } finally {
            changeLoadingStatus(false);
        }
    };

    return (
        <FormLayout>
            <h1 className="mb-2 text-4xl font-bold">TaskPodoro</h1>
            <h2 className="mb-15 text-2xl font-light">Welcome back!</h2>
            <form className="flex w-7/10 flex-col lg:w-full" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    variant="outlined"
                    label="Email"
                    type="email"
                    className="h-20"
                    error={!!errors.email || !!apiMessageResponse}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: { value: true, message: 'Email is required' },
                    })}
                />

                <TextField
                    variant="outlined"
                    label="Password"
                    margin="none"
                    type="password"
                    className="h-20"
                    error={!!errors.password || !!apiMessageResponse}
                    helperText={errors.password?.message}
                    {...register('password', {
                        required: { value: true, message: 'Password is required' },
                        minLength: { value: 8, message: 'The password is too short' },
                    })}
                />
                {
                    <p className="text-error font-secondary mx-3.5 mt-0 h-5 -translate-y-5 text-end text-[12px]">
                        {apiMessageResponse}
                    </p>
                }
                <input
                    type="submit"
                    className="bg-secondary-500 h-13 cursor-pointer rounded text-white transition hover:scale-105"
                />
            </form>
            <nav className="mt-5 flex w-full flex-col items-center lg:flex-row lg:justify-around">
                <Link to="/forgotPassword" className="text-secondary-600 hover:text-secondary-300 underline">
                    Forgot your password?
                </Link>

                <Link to="/register" className="text-secondary-600 hover:text-secondary-300 underline">
                    Not registered?
                </Link>
            </nav>
        </FormLayout>
    );
}
