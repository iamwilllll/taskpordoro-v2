import { useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRegister } from '../hooks/useAuth';
import type { RegisterT } from '../types/user';
import type { ErrorResT } from '../types/responses';

export default function Register() {
    const [apiMessageResponse, setApiMessageResponse] = useState<string>('');
    const { registerAuth } = useRegister();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterT>();

    const onSubmit: SubmitHandler<RegisterT> = async (data) => {
        const { username, email, password, repeat_password } = data;
        const response = await registerAuth({ username, email: email.toLocaleLowerCase(), password, repeat_password });

        if (axios.isAxiosError(response)) {
            console.log(response);
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
                        label="Username"
                        type="text"
                        className="h-25"
                        error={!!errors.username || !!apiMessageResponse}
                        helperText={errors.username?.message}
                        {...register('username', {
                            required: { value: true, message: 'Username is required' },
                        })}
                    />

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

                    <TextField
                        variant="outlined"
                        label="Repeat your password"
                        margin="none"
                        type="password"
                        className="h-20"
                        error={!!errors.repeat_password || !!apiMessageResponse}
                        helperText={errors.repeat_password?.message}
                        {...register('repeat_password', {
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
                    <input className="bg-secondary-500 mt-2 h-13 cursor-pointer rounded text-white transition hover:scale-105" />
                </form>

                <nav className="mt-5 flex w-full flex-col items-center lg:flex-row lg:justify-around">
                    <a href="" className="text-secondary-600 hover:text-secondary-300 underline">
                        Are you registered?
                    </a>
                </nav>
            </section>
        </div>
    );
}
