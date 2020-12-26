import { Router } from 'express';
import {
    heartStore,
    mapStores,
    searchStores,
    validateStore,
} from '../controllers/storeController';
import { catchErrors } from '../handlers/errorHandlers';

const router = Router();

router.get('/search', catchErrors(searchStores));
router.get('/stores/near', catchErrors(mapStores));
router.post(
    '/stores/:id/heart',
    catchErrors(validateStore),
    catchErrors(heartStore)
);

export default router;
