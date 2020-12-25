const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const Store = mongoose.model('Store');
const User = mongoose.model('User');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(_req, file, cb) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      cb(null, true);
    } else {
      cb(new Error(`That filetype isn't allowed!`), false);
    }
  },
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, _, next) => {
  if (!req.file) {
    return next();
  }

  const extention = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extention}`;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.addStore = (_req, res) => {
  res.render('editStore', {
    title: 'Add Store',
  });
};

exports.createStore = async (req, res) => {
  req.body.author = req.user._id;

  const store = await new Store(req.body).save();
  req.flash('success', `Successfully created ${store.name}`);
  res.redirect(`/stores/${store.slug}`);
};

exports.getStores = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 4;
  const skip = page * limit - limit;

  const storesPromise = Store.find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });
  const countPromise = Store.count();

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

const confirmOwner = (store, user) => {
  if (!store.author.equals(user._id)) {
    throw new Error('You must own this store');
  }
};

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id });
  confirmOwner(store, req.user);
  res.render('editStore', { title: `Edit Store ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  req.body.location.type = 'Point';
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>`);
  res.redirect(`/stores/${store._id}/edit`);
};

exports.getStore = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate(
    'author reviews'
  );
  if (!store) {
    next();
  }

  res.render('store', { store, title: store.name });
};

exports.getStoresByTag = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true };

  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagQuery });
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

  res.render('tags', { title: 'Tags', tags, tag, stores });
};

exports.searchStores = async (req, res) => {
  const stores = await Store.find(
    {
      $text: {
        $search: req.query.q,
      },
    },
    {
      score: {
        $meta: 'textScore',
      },
    }
  )
    .sort({
      score: {
        $meta: 'textScore',
      },
    })
    .limit(5);
  res.json(stores);
};

exports.mapStores = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
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

exports.mapPage = (req, res) => {
  res.render('map', { title: 'Map' });
};

exports.validateStore = async (req, res, next) => {
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

exports.heartStore = async (req, res) => {
  const hearts = req.user.hearts.map((obj) => obj.toString());
  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      [operator]: { hearts: req.params.id },
    },
    { new: true }
  );
  res.json(user);
};

exports.heartedStores = async (req, res) => {
  const stores = await Store.find({
    _id: {
      $in: req.user.hearts,
    },
  });
  res.render('stores', { title: 'Hearted Stores', stores });
};

exports.getTopStores = async (req, res) => {
  const stores = await Store.getTopStores();
  res.render('topStores', { stores, title: '★ Top Stores!' });
};
