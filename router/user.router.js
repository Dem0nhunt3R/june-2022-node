const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', userController.getUsers);
router.post(
    '/',
    userMiddleware.isNewUserValid,
    userMiddleware.checkIsUserEmailUnique,
    userController.createUser
);

router.get(
    '/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    userController.getUserById
);
router.put(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isEditedUserValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    userController.updateUser
);
router.delete(
    '/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userController.deleteUser
);

module.exports = router;