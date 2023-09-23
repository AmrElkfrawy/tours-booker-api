const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.protect, authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser,
);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router.route('/:id').get(authController.protect, userController.getUser);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers,
  );
router
  .route('/:id')
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
