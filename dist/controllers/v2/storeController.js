"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = exports.resize = exports.upload = void 0;
const mongoose_1 = require("mongoose");
const multer_1 = __importStar(require("multer"));
const uuid_1 = require("uuid");
const ServerError_1 = require("../../types/ServerError");
const jimp_1 = __importDefault(require("jimp"));
const Store = (0, mongoose_1.model)('Store');
const UserModel = (0, mongoose_1.model)('User');
exports.upload = (0, multer_1.default)({
    storage: (0, multer_1.memoryStorage)(),
    fileFilter(_req, file, cb) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            cb(null, true);
        }
        else {
            cb(new Error(`That filetype isn't allowed!`));
        }
    },
}).single('photo');
const resize = async (req, _res, next) => {
    const { file, body } = req;
    if (!file) {
        return next();
    }
    const extention = file.mimetype.split('/')[1];
    body.photo = `${(0, uuid_1.v4)()}.${extention}`;
    const photo = await jimp_1.default.read(file.buffer);
    photo.resize(800, jimp_1.default.AUTO);
    photo.write(`./public/uploads/${body.photo}`);
    next();
};
exports.resize = resize;
class StoreController {
    async getStores(req, res) {
        const page = req.query.page ? +req.query.page : 1;
        const limit = 4;
        const skip = page * limit - limit;
        const storesPromise = Store.find()
            .skip(skip)
            .limit(limit)
            .sort({ created: 'desc' });
        const countPromise = Store.countDocuments({});
        const [stores, count] = await Promise.all([storesPromise, countPromise]);
        const pages = Math.ceil(count / limit);
        if (!stores.length && skip) {
            throw new ServerError_1.ServerError(`No such page ${page}`, 400);
        }
        res.json({
            data: stores,
            paging: {
                page,
                pages,
                count,
            },
        });
    }
    async getStore(req, res, next) {
        const store = await Store.findOne({ slug: req.params.slug }).populate('author reviews');
        if (!store) {
            return next();
        }
        res.json({ data: store });
    }
    async updateStore(req, res) {
        console.log('UPDATE STORE');
        if (req.body.location) {
            req.body.location.type = 'Point';
        }
        const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        }).exec();
        if (!store) {
            throw new ServerError_1.ServerError(`Store ${req.params.id} not found`, 400);
        }
        res.json({ data: store });
    }
    async createStore(req, res) {
        const user = req.user;
        req.body.author = user._id;
        const store = await new Store(req.body).save();
        res.json({ data: store });
    }
    async getTopStores(_req, res) {
        const stores = await Store.getTopStores();
        res.json({ data: stores });
    }
    async getStoresByTag(req, res) {
        const tag = req.params.tag;
        const tagQuery = tag || { $exists: true };
        const tagsPromise = Store.getTagsList();
        const storesPromise = Store.find({ tags: tagQuery });
        const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
        res.json({ data: { tags, tag, stores } });
    }
    async searchStores(req, res) {
        const search = req.query.q;
        const stores = await Store.find({ $text: { $search: search } }, { score: { $meta: 'textScore' } })
            .sort({
            score: {
                $meta: 'textScore',
            },
        })
            .limit(5);
        res.json(stores);
    }
    async mapStores(req, res) {
        const coordinates = [req.query.lng, req.query.lat].map((val) => parseFloat(val));
        const q = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates,
                    },
                    $maxDistance: 10000, // 10 km
                },
            },
        };
        const stores = await Store.find(q)
            .select('slug name description location photo')
            .limit(10);
        res.json(stores);
    }
    async validateStore(req, res, next) {
        const stores = await Store.find().select('_id');
        const availableIds = stores.map((obj) => obj._id.toString());
        if (availableIds.includes(req.params.id)) {
            next();
        }
        else {
            res.status(400).json({
                msg: `There is no store with '${req.params.id}' id`,
            });
        }
    }
    async heartStore(req, res) {
        const usr = req.user;
        const hearts = usr.hearts.map((obj) => obj.toString());
        const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
        const user = await UserModel.findByIdAndUpdate(usr._id, {
            [operator]: { hearts: req.params.id },
        }, { new: true });
        res.json(user);
    }
}
exports.StoreController = StoreController;
