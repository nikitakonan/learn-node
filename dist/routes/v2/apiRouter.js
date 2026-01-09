"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/v2/authController");
const storeController_1 = require("../../controllers/v2/storeController");
const userController_1 = require("../../controllers/v2/userController");
const errorHandlers_1 = require("../../handlers/errorHandlers");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
const c = new storeController_1.StoreController();
const uc = new userController_1.UserController();
router.use((0, cors_1.default)({
    credentials: true,
    origin: /localhost:/,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}));
router.get('/stores', (0, errorHandlers_1.catchErrors)(c.getStores));
router.get('/stores/:slug', (0, errorHandlers_1.catchErrors)(c.getStore));
router.post('/add/:id', authController_1.authenticate, storeController_1.upload, (0, errorHandlers_1.catchErrors)(storeController_1.resize), (0, errorHandlers_1.catchErrors)(c.updateStore));
router.post('/add', authController_1.authenticate, storeController_1.upload, (0, errorHandlers_1.catchErrors)(storeController_1.resize), (0, errorHandlers_1.catchErrors)(c.createStore));
router.get('/top', (0, errorHandlers_1.catchErrors)(c.getTopStores));
router.get('/tags', (0, errorHandlers_1.catchErrors)(c.getStoresByTag));
router.get('/tags/:tag', (0, errorHandlers_1.catchErrors)(c.getStoresByTag));
router.post('/register', uc.validateRegister, uc.register);
router.post('/login', authController_1.login);
router.post('/account', (0, errorHandlers_1.catchErrors)(uc.updateAccount));
router.get('/search', (0, errorHandlers_1.catchErrors)(c.searchStores));
router.get('/stores/near', (0, errorHandlers_1.catchErrors)(c.mapStores));
router.post('/stores/:id/heart', authController_1.authenticate, (0, errorHandlers_1.catchErrors)(c.validateStore), (0, errorHandlers_1.catchErrors)(c.heartStore));
exports.default = router;
