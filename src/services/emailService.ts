import nodemailer from 'nodemailer';
import { ENV } from '../config/env';

const transporter = nodemailer.createTransport({
    host: ENV.MAIL_HOST,
    port: parseInt(ENV.MAIL_PORT),
    secure: ENV.MAIL_PORT === '465',
    auth: {
        user: ENV.MAIL_USER,
        pass: ENV.MAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"${ENV.NODE_ENV === 'production' ? 'Sohoza System' : 'Sohoza Dev'}" <${ENV.MAIL_FROM}>`,
            to,
            subject,
            html,
        });
        console.log(`[EMAIL] Message sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('[EMAIL] Error sending email:', error);
        // Don't throw error to avoid breaking the main flow, but log it
        return null;
    }
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${ENV.API_BASE_URL}/api/newsletter/verify/${token}`;
    const html = `
        <h1>Verify your subscription</h1>
        <p>Thank you for subscribing to our newsletter! Please click the button below to verify your email address.</p>
        <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>Or copy this link: ${verificationUrl}</p>
    `;
    return await sendEmail(email, 'Verify your newsletter subscription', html);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `${ENV.CORS_ORIGIN}/reset-password?token=${token}`;
    const html = `
        <h1>Reset your password</h1>
        <p>You requested a password reset. Please click the button below to set a new password.</p>
        <a href="${resetUrl}" style="padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
    `;
    return await sendEmail(email, 'Password Reset Request', html);
};
