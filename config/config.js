module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'localhost:27017/test-project',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://0.0.0.3000',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'accss_scrt',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'rfrsh_secrt',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'CAATS',
    FORGOT_ACCOUNT_ACTION_TOKEN_SECRET: process.env.FORGOT_ACCOUNT_ACTION_TOKEN_SECRET || 'FAATS'
}