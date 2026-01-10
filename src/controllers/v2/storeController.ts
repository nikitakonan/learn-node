import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { model } from 'mongoose';
import multer, { memoryStorage } from 'multer';
import { Store, StoreModel } from '../../models/Store';
import { ServerError } from '../../types/ServerError';
import jimp from 'jimp';
import { User } from '../../models/User';

const Store = model<Store, StoreModel>('Store');
const UserModel = model<User>('User');

type StoresBody = {
  data: Store[];
  paging: {
    page: number;
    pages: number;
    count: number;
  };
};

export const upload = multer({
  storage: memoryStorage(),
  fileFilter(_req, file, cb) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      cb(null, true);
    } else {
      cb(new Error(`That filetype isn't allowed!`));
    }
  },
}).single('photo');

export const resize: RequestHandler = async (req, _res, next) => {
  const { file, body } = req;
  if (!file) {
    return next();
  }

  const extension = file.mimetype.split('/')[1];
  body.photo = `${randomUUID()}.${extension}`;

  const photo = await jimp.read(file.buffer);
  photo.resize(800, jimp.AUTO);
  photo.write(`./public/uploads/${body.photo}`);
  next();
};

export class StoreController {
  async getStores(req: Request, res: Response<StoresBody>) {
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
      throw new ServerError(`No such page ${page}`, 400);
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
  async getStore(req: Request, res: Response, next: NextFunction) {
    const store = await Store.findOne({ slug: req.params.slug }).populate(
      'author reviews'
    );
    if (!store) {
      return next();
    }

    res.json({ data: store });
  }
  async updateStore(req: Request, res: Response) {
    console.log('UPDATE STORE');
    if (req.body.location) {
      req.body.location.type = 'Point';
    }
    const store = await Store.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    if (!store) {
      throw new ServerError(`Store ${req.params.id} not found`, 400);
    }
    res.json({ data: store });
  }
  async createStore(req: Request, res: Response) {
    const user = req.user as User;
    req.body.author = user._id;

    const store = await new Store(req.body).save();
    res.json({ data: store });
  }
  async getTopStores(_req: Request, res: Response) {
    const stores = await Store.getTopStores();
    res.json({ data: stores });
  }
  async getStoresByTag(req: Request, res: Response) {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true };

    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({ tags: tagQuery });
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

    res.json({ data: { tags, tag, stores } });
  }
  async searchStores(req: Request, res: Response) {
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
  }
  async mapStores(req: Request, res: Response) {
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
  }
  async validateStore(req: Request, res: Response, next: NextFunction) {
    const stores = await Store.find().select('_id');
    const availableIds = stores.map((obj) => obj._id.toString());
    if (availableIds.includes(req.params.id)) {
      next();
    } else {
      res.status(400).json({
        msg: `There is no store with '${req.params.id}' id`,
      });
    }
  }
  async heartStore(req: Request, res: Response) {
    const usr = req.user as User;
    const hearts = usr.hearts.map((obj) => obj.toString());
    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await UserModel.findByIdAndUpdate(
      usr._id,
      {
        [operator]: { hearts: req.params.id },
      },
      { new: true }
    );
    res.json(user);
  }
}
