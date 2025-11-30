import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import type { RegisterT } from '../types';
import { useLoading, useNotification } from '../context/store';
import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { TextField } from '@mui/material';
import FormLayout from '../layout/FormLayout';

export default function Register() {
    //* form validations
    const { handleSubmit, register, reset, formState, control } = useForm<RegisterT>();
    const { errors } = formState;
    const password = useWatch({ control, name: 'password' });

    //* custom hooks
    const { changeLoadingStatus } = useLoading();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    //* error message
    const [apiMessageResponse, setApiMessageResponse] = useState<string>('');

    //* handle form
    const onSubmit: SubmitHandler<RegisterT> = async (data) => {
        changeLoadingStatus(true);
        const { username, email, password, repeat_password } = data;

        try {
            await axios.post(`${config.baseUrl}/register`, {
                username,
                email: email.toLocaleLowerCase(),
                password,
                repeat_password,
            });

            changeLoadingStatus(false);
            showNotification('Validation code was send to your email');
            reset();
            navigate(`/verifyUser?email=${email}`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
                return setApiMessageResponse(error.response?.data?.message ?? 'Something went wrong');
            } else {
                setApiMessageResponse('Unexpected error');
            }
        } finally {
            changeLoadingStatus(false);
        }
    };

    return (
        <FormLayout>
            <h2 className="mb-2 text-4xl font-bold">TaskPodoro</h2>
            <h3 className="mb-15 text-2xl font-light">Create account</h3>

            <form className="flex flex-col lg:w-full" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    variant="outlined"
                    label="Username"
                    type="text"
                    className="h-20"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    {...register('username', {
                        required: { value: true, message: 'Username is required' },
                    })}
                />

                <TextField
                    variant="outlined"
                    label="Email"
                    type="email"
                    className="h-20"
                    error={!!errors.email || !!apiMessageResponse}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: { value: true, message: 'Email is required' },
                        onChange: () => setApiMessageResponse(''),
                    })}
                />

                <TextField
                    variant="outlined"
                    label="Password"
                    margin="none"
                    type="password"
                    className="h-20"
                    error={!!errors.repeat_password}
                    helperText={errors.password?.message}
                    {...register('password', {
                        required: { value: true, message: 'Password is required' },
                        minLength: { value: 8, message: 'The password is too short' },
                    })}
                />

                <TextField
                    variant="outlined"
                    label="Repeat your password"
                    margin="none"
                    type="password"
                    className="h-20"
                    error={!!errors.repeat_password}
                    helperText={errors.repeat_password?.message}
                    {...register('repeat_password', {
                        required: { value: true, message: 'Password is required' },
                        minLength: { value: 8, message: 'The password is too short' },
                        validate: (value) => value === password || 'The passwords do not match',
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
                <Link to="/" className="text-secondary-600 hover:text-secondary-300 underline">
                    Are you registered?
                </Link>
            </nav>
        </FormLayout>
    );
}
