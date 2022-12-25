const router = require('express').Router();

const controller = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');

router.post(
    '/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    controller.login);

router.post('/refresh', authMiddleware.checkRefreshToken, controller.refresh);

router.post('/logout', authMiddleware.checkAccessToken, controller.logout);

router.post('/logoutAll', authMiddleware.checkAccessToken, controller.logoutAll)

router.post('/password/forgot', userMiddleware.getUserDynamically('email'), controller.forgotPassword,);
router.put('/password/forgot', authMiddleware.checkActionToken, controller.changePasswordAfterForgot);

module.exports = router;
