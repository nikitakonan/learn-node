const express = require('express');
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');
const router = express.Router();

router.get('/search', catchErrors(storeController.searchStores));
router.get('/stores/near', catchErrors(storeController.mapStores));
router.post(
  '/stores/:id/heart',
  catchErrors(storeController.validateStore),
  catchErrors(storeController.heartStore)
);

module.exports = router;
