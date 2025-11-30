import axios, { type AxiosError, type AxiosResponse } from 'axios';
import config from '../config';
import type { LoginT, RegisterT } from '../types/user';

export function useLogin() {
    const login = async (data: LoginT): Promise<AxiosResponse | AxiosError> => {
        try {
            throw await axios.post(config.auth.login, data);
        } catch (err) {
            throw err as AxiosError;
        }
    };
    return { login };
}

export function useRegister() {
    const registerUser = async (data: RegisterT) => {
        return await axios.post(config.auth.register, data);
    };

    return { registerUser };
}
