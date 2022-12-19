const nodemailer = require("nodemailer");
const EmailTemplates = require('email-templates');
const path = require('path');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require("../config/config");
const emailTemplates = require('../emailTemplate');
const ApiError = require("../error/ApiError");

const sendEmail = async (receiverEmail, emailActions, locals = {}) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD
            }
        });

        const templateInfo = emailTemplates[emailActions];

        if (!templateInfo) {
            throw new ApiError('Wrong template', 500);
        }

        const templateRenderer = new EmailTemplates({
            views: {
                root: path.join(process.cwd(), 'emailTemplate')
            }
        });

        const html = await templateRenderer.render(templateInfo.templateName, locals);

        return transporter.sendMail({
            from: 'No reply',
            to: receiverEmail,
            html
        })
    } catch (e) {
        throw new ApiError('Send email error', 500);
    }
}

module.exports = {
    sendEmail
}