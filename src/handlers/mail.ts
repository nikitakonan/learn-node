import htmlToText from 'html-to-text';
import juice from 'juice';
import { createTransport } from 'nodemailer';
import { SmtpOptions } from 'nodemailer-smtp-transport';
import pug from 'pug';
import { User } from '../models/User';

const transportOptions: SmtpOptions = {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT!,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
};

const transport = createTransport(transportOptions);

const generateHTML = (filename: string, options = {}) => {
    const html = pug.renderFile(
        `${__dirname}/../../views/email/${filename}.pug`,
        options
    );
    const inlined = juice(html);
    return inlined;
};

export interface SendOptions {
    filename: string;
    user: User;
    subject: string;
    resetURL: string;
}

export const send = async (options: SendOptions) => {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);

    const mailOptions = {
        from: `Wes Bos <noreply@wesbos.com>`,
        to: options.user.email,
        subject: options.subject,
        html,
        text,
    };

    return transport.sendMail(mailOptions);
};
