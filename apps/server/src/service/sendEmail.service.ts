import nodemailer from 'nodemailer';
import { promises as fs } from 'node:fs';
import config from '../config/config.js';
import path from 'node:path';

const __dirname = import.meta.dirname;
const filePath = path.join(__dirname, '../emails/VerifyCode.html');
const emailTemplate = await fs.readFile(filePath, 'utf8');

type SendEmailProps = {
    to: string;
    subject: string;
    text: string;
    code: string;
};

export default async function sendEmail({ code, to, subject, text }: SendEmailProps) {
    const html = emailTemplate
        .replace('{{Code}}', code)
        .replace('{{LinkApp}}', config.url)
        .replace('{{linkToLogin}}', `${config.url}/verifyUser?email=${to}&token=${code}`);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.nodemailer.user,
            pass: config.nodemailer.pass,
        },
    });

    await transporter.sendMail({ from: config.nodemailer.user, to, subject, text, html });
}
