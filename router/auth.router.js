const router = require('express').Router();

const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');
const authController = require('../controller/auth.controller');

router.post(
    '/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/logoutAll', authMiddleware.checkAccessToken, authController.logoutAllDevices);

module.exports = router;