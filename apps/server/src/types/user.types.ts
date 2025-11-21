import * as z from 'zod';

export const UserZodSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
});

export type UserT = z.input<typeof UserZodSchema>;
