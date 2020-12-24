const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', authController.isLoggedIn, storeController.addStore);
router.get('/stores/:slug', catchErrors(storeController.getStore));

router.post(
  '/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

router.post(
  '/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post(
  '/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/map', storeController.mapPage);

router.get(
  '/hearts',
  authController.isLoggedIn,
  catchErrors(storeController.heartedStores)
);

module.exports = router;
