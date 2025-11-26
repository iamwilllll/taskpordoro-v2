export type ApiSuccessT<T> = {
    ok: true;
    message: string;
    data: T;
};

export type ApiErrorT = {
    ok: false;
    message: string;
    error: {
        code: string;
        details?: unknown;
    };
};

export type ApiResponseT<T> = ApiSuccessT<T> | ApiErrorT;
