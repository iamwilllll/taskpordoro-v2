import { scryptSync } from 'node:crypto';

export default function verifyPassword(password: string, stored: string) {
    const [salt, storedHash] = stored.split(':');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return hash === storedHash;
}
