import { Router } from 'express';
import { authenticate, login } from '../../controllers/v2/authController';
import {
  resize,
  StoreController,
  upload,
} from '../../controllers/v2/storeController';
import { UserController } from '../../controllers/v2/userController';
import { catchErrors } from '../../handlers/errorHandlers';

const router = Router();
const c = new StoreController();
const uc = new UserController();

router.get('/stores', authenticate, catchErrors(c.getStores));
router.get('/stores/:slug', catchErrors(c.getStore));
router.post(
  '/add/:id',
  authenticate,
  upload,
  catchErrors(resize),
  catchErrors(c.updateStore)
);
router.post('/add', upload, catchErrors(resize), catchErrors(c.createStore));
router.get('/top', catchErrors(c.getTopStores));
router.get('/tags', catchErrors(c.getStoresByTag));
router.get('/tags/:tag', catchErrors(c.getStoresByTag));
router.post('/register', uc.validateRegister, catchErrors(uc.register), login);
router.post('/login', login);

export default router;
