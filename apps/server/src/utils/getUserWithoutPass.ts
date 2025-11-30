import { UserT, UserWithOutPassT } from '../types/user.types.js';

export default function getUserWithoutPass(user: UserT): UserWithOutPassT {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
}
