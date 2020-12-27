"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const html_to_text_1 = __importDefault(require("html-to-text"));
const juice_1 = __importDefault(require("juice"));
const nodemailer_1 = require("nodemailer");
const pug_1 = __importDefault(require("pug"));
const transportOptions = {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
};
const transport = nodemailer_1.createTransport(transportOptions);
const generateHTML = (filename, options = {}) => {
    const html = pug_1.default.renderFile(`${__dirname}/../../views/email/${filename}.pug`, options);
    const inlined = juice_1.default(html);
    return inlined;
};
const send = async (options) => {
    const html = generateHTML(options.filename, options);
    const text = html_to_text_1.default.fromString(html);
    const mailOptions = {
        from: `Wes Bos <noreply@wesbos.com>`,
        to: options.user.email,
        subject: options.subject,
        html,
        text,
    };
    return transport.sendMail(mailOptions);
};
exports.send = send;
