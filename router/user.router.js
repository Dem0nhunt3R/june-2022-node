const {userController} = require("../controller");
const {userMiddleware} = require("../middleware");
const router = require('express').Router();

router.get('/', userController.getUsers);
router.post(
    '/',
    userMiddleware.isBodyValidCreate,
    userMiddleware.checkIsEmailUnique,
    userMiddleware.normalizator,
    userController.createUser);

router.get('/:userId', userMiddleware.checkIsUserExists, userController.getUserById);
router.put(
    '/:userId',
    userMiddleware.isBodyValidUpdate,
    userMiddleware.checkIsUserExists,
    userMiddleware.normalizator,
    userController.updateUser);
router.delete('/:userId', userMiddleware.checkIsUserExists, userController.deleteUser);

module.exports = router;
