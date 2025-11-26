import { useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLogin } from '../hooks/useAuth';
import type { LoginT } from '../types/user';
import type { ErrorResT } from '../types/responses';

export default function Login() {
    const [apiMessageResponse, setApiMessageResponse] = useState<string>('');
    const { login } = useLogin();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginT>();

    const onSubmit: SubmitHandler<LoginT> = async (data) => {
        const { email, password } = data;
        const response = await login({ email: email.toLocaleLowerCase(), password });

        if (axios.isAxiosError(response)) {
            const errorData = response.response?.data;
            setApiMessageResponse((errorData as ErrorResT)?.message);

            return;
        }

        console.log(response.data);
    };

    return (
        <div className="flex size-full">
            <section className="from-primary-600 to-secondary-300 hidden h-full w-6/10 border-4 border-white bg-linear-to-b lg:block"></section>

            <section className="flex w-full flex-col items-center justify-center lg:w-4/10 lg:p-20">
                <h1 className="mb-2 text-4xl font-bold">TaskPodoro</h1>
                <h2 className="mb-15 text-2xl font-light">Welcome back!</h2>

                <form className="flex w-7/10 flex-col lg:w-full" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        label="Email"
                        type="email"
                        className="h-25"
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
                        <p className="text-error font-secondary mx-[14px] mt-0 h-5 -translate-y-5 text-end text-[12px]">
                            {apiMessageResponse}
                        </p>
                    }
                    <input
                        type="submit"
                        className="bg-secondary-500 h-13 cursor-pointer rounded text-white transition hover:scale-105"
                    />
                    <input className="bg-secondary-500 mt-2 h-13 cursor-pointer rounded text-white transition hover:scale-105" />
                </form>
                <nav className="mt-5 flex w-full flex-col items-center lg:flex-row lg:justify-around">
                    <a href="" className="text-secondary-600 hover:text-secondary-300 underline">
                        Forgot your password?
                    </a>

                    <a href="" className="text-secondary-600 hover:text-secondary-300 underline">
                        Not registered?
                    </a>
                </nav>
            </section>
        </div>
    );
}
