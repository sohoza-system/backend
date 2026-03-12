import nodemailer from 'nodemailer';
import { ENV } from '../config/env';
import * as templates from '../utils/emailTemplates';

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
        return null;
    }
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${ENV.API_BASE_URL}/api/newsletter/verify/${token}`;
    const content = `
        <h2>Verify your subscription</h2>
        <p>Thank you for subscribing to our newsletter! Please click the button below to verify your email address.</p>
        <a href="${verificationUrl}" class="button">Verify Email</a>
        <p>If the button doesn't work, copy this link: <br> ${verificationUrl}</p>
    `;
    return await sendEmail(email, 'Verify your newsletter subscription', templates.baseLayout(content));
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `${ENV.CORS_ORIGIN}/reset-password?token=${token}`;
    const content = `
        <h2>Reset your password</h2>
        <p>You requested a password reset. Please click the button below to set a new password.</p>
        <a href="${resetUrl}" class="button" style="background-color: #dc3545;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
    `;
    return await sendEmail(email, 'Password Reset Request', templates.baseLayout(content));
};

export const sendWelcomeEmail = async (email: string, name: string) => {
    return await sendEmail(email, 'Welcome to Sohoza System', templates.welcomeTemplate(name));
};

export const sendContactReceipt = async (email: string, name: string, subject: string) => {
    return await sendEmail(email, `Re: ${subject}`, templates.contactReceiptTemplate(name, subject));
};

export const sendPasswordChangedNotification = async (email: string) => {
    return await sendEmail(email, 'Security Alert: Password Changed', templates.passwordChangedTemplate());
};

export const sendNewsletterConfirmation = async (email: string, unsubscribeToken: string) => {
    const unsubscribeUrl = `${ENV.API_BASE_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;
    return await sendEmail(email, 'Subscription Confirmed', templates.newsletterSubscribedTemplate(unsubscribeUrl));
};
