export type RegisterT = {
    username: string;
    email: string;
    password: string;
    repeat_password: string;
};

export type LoginT = {
    email: string;
    password: string;
};

export type VerifyUserT = {
    email: string;
    token: string;
};

export type UserT = {
    _id: string;
    username: string;
    email: string;
    verified: boolean;
    verificationToken: string;
    verificationTokenExpire: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
