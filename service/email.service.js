const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const emailTemplate = require('../emailTemplate');
const {NO_REPLY_EMAIL, NO_REPLAY_EMAIL_PASSWORD, FRONTEND_URL} = require("../config/config");
const ApiError = require("../error/ApiError");

module.exports = {
    sendEmail: async (receiverEmail, emailAction, context = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'no reply',
            service: 'gmail',
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLAY_EMAIL_PASSWORD
            }
        });

        const templateInfo = emailTemplate[emailAction];

        if (!templateInfo?.subject || !templateInfo.templateName) {
            throw new ApiError('Wrong template', 500);
        }

        const options = {
            viewEngine: {
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'emailTemplate', 'layout'),
                partialsDir: path.join(process.cwd(), 'emailTemplate', 'partial'),
                extname: '.hbs'
            },
            extName: '.hbs',
            viewPath: path.join(process.cwd(), 'emailTemplate', 'view')
        };

        transporter.use('compile', hbs(options));

        context.frontendUrl = FRONTEND_URL;

        return transporter.sendMail({
            to: receiverEmail,
            subject: templateInfo.subject,
            template: templateInfo.templateName,
            context
        })
    }
}