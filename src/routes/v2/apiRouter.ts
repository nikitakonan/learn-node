import { Router } from 'express';
import { authenticate, login } from '../../controllers/v2/authController';
import {
  resize,
  StoreController,
  upload,
} from '../../controllers/v2/storeController';
import { UserController } from '../../controllers/v2/userController';
import { catchErrors } from '../../handlers/errorHandlers';
import cors from 'cors';

const router = Router();
const c = new StoreController();
const uc = new UserController();

router.use(
  cors({
    credentials: true,
    origin: /localhost:/,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

router.get('/stores', catchErrors(c.getStores));
router.get('/stores/:slug', catchErrors(c.getStore));
router.post(
  '/add/:id',
  authenticate,
  upload,
  catchErrors(resize),
  catchErrors(c.updateStore)
);
router.post(
  '/add',
  authenticate,
  upload,
  catchErrors(resize),
  catchErrors(c.createStore)
);
router.get('/top', catchErrors(c.getTopStores));
router.get('/tags', catchErrors(c.getStoresByTag));
router.get('/tags/:tag', catchErrors(c.getStoresByTag));
router.post('/register', uc.validateRegister, uc.register);
router.post('/login', login);
router.post('/account', catchErrors(uc.updateAccount));

router.get('/search', catchErrors(c.searchStores));
router.get('/stores/near', catchErrors(c.mapStores));
router.post(
  '/stores/:id/heart',
  authenticate,
  catchErrors(c.validateStore),
  catchErrors(c.heartStore)
);

export default router;
