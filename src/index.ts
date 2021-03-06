import mongoose from 'mongoose';
import dotenv from 'dotenv';

interface AddressInfo {
  address: string;
  family: string;
  port: number;
}

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
  console.log(
    "🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou're on an older version of node that doesn't support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 10.0 or greater. 👌\n "
  );
  process.exit();
}

// import environmental variables from our variables.env file
dotenv.config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!
import './models/Store';
import './models/User';
import './models/Review';

import './handlers/mail';

// Start our app!
import app from './app';

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  const address = server.address() as AddressInfo;
  console.log(`Express running → PORT ${address.port}`);
});
