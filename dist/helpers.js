"use strict";
/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = exports.siteName = exports.icon = exports.staticMap = exports.dump = exports.moment = void 0;
// FS is a built in module to node that let's us read files from the system we're running on
const fs_1 = __importDefault(require("fs"));
// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
var moment_1 = require("moment");
Object.defineProperty(exports, "moment", { enumerable: true, get: function () { return __importDefault(moment_1).default; } });
// Dump is a handy debugging function we can use to sort of "console.log" our data
const dump = (obj) => JSON.stringify(obj, null, 2);
exports.dump = dump;
// Making a static map is really long - this is a handy helper function to make one
const staticMap = ([lng, lat]) => `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${lat},${lng}/14?mapSize=800,150&pp=${lat},${lng};66&mapLayer=Basemap,Buildings&key=${process.env.MAP_KEY}&dpi=Large`;
exports.staticMap = staticMap;
// inserting an SVG
const icon = (name) => fs_1.default.readFileSync(`./public/images/icons/${name}.svg`);
exports.icon = icon;
// Some details about the site
exports.siteName = `Now That's Delicious!`;
exports.menu = [
    { slug: '/stores', title: 'Stores', icon: 'store' },
    { slug: '/tags', title: 'Tags', icon: 'tag' },
    { slug: '/top', title: 'Top', icon: 'top' },
    { slug: '/add', title: 'Add', icon: 'add' },
    { slug: '/map', title: 'Map', icon: 'map' },
];
