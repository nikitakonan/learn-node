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
exports.getTopStores = exports.heartedStores = exports.heartStore = exports.validateStore = exports.mapPage = exports.mapStores = exports.searchStores = exports.getStoresByTag = exports.getStore = exports.updateStore = exports.editStore = exports.getStores = exports.createStore = exports.addStore = exports.resize = exports.upload = void 0;
const jimp_1 = __importDefault(require("jimp"));
const mongoose_1 = require("mongoose");
const multer_1 = __importStar(require("multer"));
const uuid_1 = require("uuid");
const Store = (0, mongoose_1.model)('Store');
const User = (0, mongoose_1.model)('User');
const multerOptions = {
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
};
exports.upload = (0, multer_1.default)(multerOptions).single('photo');
const resize = async (req, _res, next) => {
    if (!req.file) {
        return next();
    }
    const extention = req.file.mimetype.split('/')[1];
    req.body.photo = `${(0, uuid_1.v4)()}.${extention}`;
    const photo = await jimp_1.default.read(req.file.buffer);
    await photo.resize(800, jimp_1.default.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    next();
};
exports.resize = resize;
const addStore = (_req, res) => {
    res.render('editStore', {
        title: 'Add Store',
    });
};
exports.addStore = addStore;
const createStore = async (req, res) => {
    const user = req.user;
    req.body.author = user._id;
    const store = await new Store(req.body).save();
    req.flash('success', `Successfully created ${store.name}`);
    res.redirect(`/stores/${store.slug}`);
};
exports.createStore = createStore;
const getStores = async (req, res) => {
    const page = req.params.page ? +req.params.page : 1;
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
        req.flash('info', `No such page ${page}`);
        res.redirect(`/stores/page/${pages}`);
        return;
    }
    res.render('stores', {
        title: 'Stores',
        stores,
        page,
        pages,
        count,
    });
};
exports.getStores = getStores;
const confirmOwner = (store, user) => {
    if (!user._id.equals(store.author)) {
        throw new Error('You must own this store');
    }
};
const editStore = async (req, res) => {
    const store = await Store.findOne({ _id: req.params.id });
    if (!store) {
        req.flash('error', `Store ${req.params.id} not found`);
        return res.render('back');
    }
    const user = req.user;
    confirmOwner(store, user);
    res.render('editStore', { title: `Edit Store ${store.name}`, store });
};
exports.editStore = editStore;
const updateStore = async (req, res) => {
    req.body.location.type = 'Point';
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    }).exec();
    if (!store) {
        if (!store) {
            req.flash('error', `Store ${req.params.id} not found`);
            return res.render('back');
        }
    }
    req.flash('success', `Successfully updated <strong>${store.name}</strong>`);
    res.redirect(`/stores/${store._id}/edit`);
};
exports.updateStore = updateStore;
const getStore = async (req, res, next) => {
    const store = await Store.findOne({ slug: req.params.slug }).populate('author reviews');
    if (!store) {
        return next();
    }
    res.render('store', { store, title: store.name });
};
exports.getStore = getStore;
const getStoresByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true };
    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({ tags: tagQuery });
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
    res.render('tags', { title: 'Tags', tags, tag, stores });
};
exports.getStoresByTag = getStoresByTag;
const searchStores = async (req, res) => {
    const search = req.query.q;
    const stores = await Store.find({ $text: { $search: search } }, { score: { $meta: 'textScore' } })
        .sort({
        score: {
            $meta: 'textScore',
        },
    })
        .limit(5);
    res.json(stores);
};
exports.searchStores = searchStores;
const mapStores = async (req, res) => {
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
};
exports.mapStores = mapStores;
const mapPage = (req, res) => {
    res.render('map', { title: 'Map' });
};
exports.mapPage = mapPage;
const validateStore = async (req, res, next) => {
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
};
exports.validateStore = validateStore;
const heartStore = async (req, res) => {
    const usr = req.user;
    const hearts = usr.hearts.map((obj) => obj.toString());
    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User.findByIdAndUpdate(usr._id, {
        [operator]: { hearts: req.params.id },
    }, { new: true });
    res.json(user);
};
exports.heartStore = heartStore;
const heartedStores = async (req, res) => {
    const user = req.user;
    const stores = await Store.find({
        _id: {
            $in: user.hearts,
        },
    });
    res.render('stores', { title: 'Hearted Stores', stores });
};
exports.heartedStores = heartedStores;
const getTopStores = async (_req, res) => {
    const stores = await Store.getTopStores();
    res.render('topStores', { stores, title: '★ Top Stores!' });
};
exports.getTopStores = getTopStores;
