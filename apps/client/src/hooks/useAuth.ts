import axios, { type AxiosError, type AxiosResponse } from 'axios';
import config from '../config';
import type { LoginT, RegisterT } from '../types/user';

export function useLogin() {
    const login = async (data: LoginT): Promise<AxiosResponse | AxiosError> => {
        try {
            return await axios.post(config.auth.login, data);
        } catch (err) {
            return err as AxiosError;
        }
    };

    return { login };
}

export function useRegister() {
    const registerAuth = async (data: RegisterT): Promise<AxiosResponse | AxiosError> => {
        try {
            return await axios.post(config.auth.register, data);
        } catch (err) {
            return err as AxiosError;
        }
    };

    return { registerAuth };
}
