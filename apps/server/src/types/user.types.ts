import { Document } from 'mongoose';
import * as z from 'zod';

export const UserZodSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),

    verified: z.boolean().optional(),
    verificationToken: z.string().optional(),
    verificationTokenExpire: z.date().optional(),

    resetToken: z.string().optional(),
    resetTokenExpire: z.date().optional(),
});

export type UserT = z.input<typeof UserZodSchema> & Document;
export type UserWithOutPassT = Omit<UserT, 'password'>;
