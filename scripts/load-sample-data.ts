import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import Store from '../src/models/Store';
import Review from '../src/models/Review';
import User from '../src/models/User';

mongoose.connect(process.env.DATABASE!);

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Store.deleteMany();
  await Review.deleteMany();
  await User.deleteMany();
  console.log(
    'Data Deleted. To load sample data, run\n\n\t npm run sample\n\n',
  );
  process.exit();
}

async function loadData() {
  const storesData = await readFile(__dirname + '/stores.json', 'utf-8');
  const stores = JSON.parse(storesData);
  const reviewsData = await readFile(__dirname + '/reviews.json', 'utf-8');
  const reviews = JSON.parse(reviewsData);
  const usersData = await readFile(__dirname + '/users.json', 'utf-8');
  const users = JSON.parse(usersData);

  try {
    await Store.insertMany(stores);
    await Review.insertMany(reviews);
    await User.insertMany(users);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n',
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
