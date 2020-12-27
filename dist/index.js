"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
    console.log("🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou're on an older version of node that doesn't support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 10.0 or greater. 👌\n ");
    process.exit();
}
// import environmental variables from our variables.env file
dotenv_1.default.config({ path: 'variables.env' });
// Connect to our Database and handle any bad connections
mongoose_1.default.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
mongoose_1.default.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose_1.default.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
// READY?! Let's go!
require("./models/Store");
require("./models/User");
require("./models/Review");
require("./handlers/mail");
// Start our app!
const app_1 = __importDefault(require("./app"));
app_1.default.set('port', process.env.PORT || 7777);
const server = app_1.default.listen(app_1.default.get('port'), () => {
    const address = server.address();
    console.log(`Express running → PORT ${address.port}`);
});
