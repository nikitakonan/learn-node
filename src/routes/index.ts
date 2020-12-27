import { Router } from 'express';
import {
  confirmedPasswords,
  forgot,
  isLoggedIn,
  login,
  logout,
  reset,
  update,
} from '../controllers/authController';
import { addReview } from '../controllers/reviewController';
import {
  addStore,
  createStore,
  editStore,
  getStore,
  getStores,
  getStoresByTag,
  getTopStores,
  heartedStores,
  mapPage,
  resize,
  updateStore,
  upload,
} from '../controllers/storeController';
import {
  account,
  loginForm,
  register,
  registerForm,
  updateAccount,
  validateRegister,
} from '../controllers/userController';
import { catchErrors } from '../handlers/errorHandlers';

const router = Router();

router.get('/', catchErrors(getStores));
router.get('/stores', catchErrors(getStores));
router.get('/stores/page/:page', catchErrors(getStores));
router.get('/add', isLoggedIn, addStore);
router.get('/stores/:slug', catchErrors(getStore));
router.post('/add/:id', upload, catchErrors(resize), catchErrors(updateStore));
router.post('/add', upload, catchErrors(resize), catchErrors(createStore));
router.get('/stores/:id/edit', catchErrors(editStore));
router.get('/top', catchErrors(getTopStores));
router.get('/tags', catchErrors(getStoresByTag));
router.get('/tags/:tag', catchErrors(getStoresByTag));
router.get('/login', loginForm);
router.get('/logout', logout);
router.post('/login', login);
router.get('/register', registerForm);
router.get('/account', isLoggedIn, account);
router.post('/account', catchErrors(updateAccount));
router.post('/account/forgot', catchErrors(forgot));
router.get('/account/reset/:token', catchErrors(reset));
router.post('/account/reset/:token', confirmedPasswords, catchErrors(update));
router.post('/register', validateRegister, register, login);
router.get('/map', mapPage);
router.get('/hearts', isLoggedIn, catchErrors(heartedStores));
router.post('/reviews/:id', isLoggedIn, catchErrors(addReview));

export default router;
