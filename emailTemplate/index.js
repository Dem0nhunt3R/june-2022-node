const {WELCOME, FORGOT_PASSWORD} = require("../enum/emailAction");
module.exports = {
    [WELCOME]: {
        subject: 'Welcome on out platform',
        templateName: 'welcome'
    },
    [FORGOT_PASSWORD]: {
        subject: 'Password change',
        templateName: 'forgotPassword'
    }
}