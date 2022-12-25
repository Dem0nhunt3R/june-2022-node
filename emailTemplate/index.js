const {WELCOME, FORGOT_PASS} = require("../config/emailAction.enum");
module.exports = {
    [WELCOME]: {
        subject: 'Welcome on board',
        templateName: 'welcome'
    },
    [FORGOT_PASS]: {
        subject: 'Restore password',
        templateName:'forgotPass'
    }
}