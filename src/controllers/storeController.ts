import { randomUUID } from 'node:crypto';
import { RequestHandler } from 'express';
import jimp from 'jimp';
import { model } from 'mongoose';
import multer, { Options, memoryStorage } from 'multer';
import { Store, StoreModel } from '../models/Store';
import { User } from '../models/User';

const Store = model<Store, StoreModel>('Store');
const User = model<User>('User');

const multerOptions: Options = {
  storage: memoryStorage(),
  fileFilter(_req, file, cb) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      cb(null, true);
    } else {
      cb(new Error(`That filetype isn't allowed!`));
    }
  },
};

export const upload = multer(multerOptions).single('photo');

export const resize: RequestHandler = async (req, _res, next) => {
  if (!req.file) {
    return next();
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${randomUUID()}.${extension}`;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

export const addStore: RequestHandler = (_req, res) => {
  res.render('editStore', {
    title: 'Add Store',
  });
};

export const createStore: RequestHandler = async (req, res) => {
  const user = req.user as User;
  req.body.author = user._id;

  const store = await new Store(req.body).save();
  req.flash('success', `Successfully created ${store.name}`);
  res.redirect(`/stores/${store.slug}`);
};

export const getStores: RequestHandler = async (req, res) => {
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

const confirmOwner = (store: Store, user: User) => {
  if (!user._id.equals(store.author)) {
    throw new Error('You must own this store');
  }
};

export const editStore: RequestHandler = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id });
  if (!store) {
    req.flash('error', `Store ${req.params.id} not found`);
    return res.render('back');
  }
  const user = req.user as User;
  confirmOwner(store, user);
  res.render('editStore', { title: `Edit Store ${store.name}`, store });
};

export const updateStore: RequestHandler = async (req, res) => {
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

export const getStore: RequestHandler = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate(
    'author reviews'
  );
  if (!store) {
    return next();
  }

  res.render('store', { store, title: store.name });
};

export const getStoresByTag: RequestHandler = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true };

  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagQuery });
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

  res.render('tags', { title: 'Tags', tags, tag, stores });
};

export const searchStores: RequestHandler = async (req, res) => {
  const search = <string>req.query.q;
  const stores = await Store.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  )
    .sort({
      score: {
        $meta: 'textScore',
      },
    })
    .limit(5);
  res.json(stores);
};

export const mapStores: RequestHandler = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map((val: any) =>
    parseFloat(val)
  );
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

export const mapPage: RequestHandler = (req, res) => {
  res.render('map', { title: 'Map' });
};

export const validateStore: RequestHandler = async (req, res, next) => {
  const stores = await Store.find().select('_id');
  const availableIds = stores.map((obj) => obj._id.toString());
  if (availableIds.includes(req.params.id)) {
    next();
  } else {
    res.status(400).json({
      msg: `There is no store with '${req.params.id}' id`,
    });
  }
};

export const heartStore: RequestHandler = async (req, res) => {
  const usr = req.user as User;
  const hearts = usr.hearts.map((obj) => obj.toString());
  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User.findByIdAndUpdate(
    usr._id,
    {
      [operator]: { hearts: req.params.id },
    },
    { new: true }
  );
  res.json(user);
};

export const heartedStores: RequestHandler = async (req, res) => {
  const user = req.user as User;
  const stores = await Store.find({
    _id: {
      $in: user.hearts,
    },
  });
  res.render('stores', { title: 'Hearted Stores', stores });
};

export const getTopStores: RequestHandler = async (_req, res) => {
  const stores = await Store.getTopStores();
  res.render('topStores', { stores, title: '★ Top Stores!' });
};
