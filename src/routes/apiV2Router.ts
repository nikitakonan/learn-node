import { Router } from 'express';
import {
  resize,
  StoreController,
  upload,
} from '../controllers/storeV2Controller';
import { catchErrors } from '../handlers/errorHandlers';

const router = Router();
const c = new StoreController();

router.get('/stores', catchErrors(c.getStores));
router.get('/stores/:slug', catchErrors(c.getStore));
router.post(
  '/add/:id',
  upload,
  catchErrors(resize),
  catchErrors(c.updateStore)
);
router.post('/add', upload, catchErrors(resize), catchErrors(c.createStore));
router.get('/top', catchErrors(c.getTopStores));
router.get('/tags', catchErrors(c.getStoresByTag));
router.get('/tags/:tag', catchErrors(c.getStoresByTag));

export default router;
