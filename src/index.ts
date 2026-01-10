import mongoose from 'mongoose';

interface AddressInfo {
  address: string;
  family: string;
  port: number;
}

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE!);

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
