/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
import fs from 'fs';

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
export { default as moment } from 'moment';

// Dump is a handy debugging function we can use to sort of "console.log" our data
export const dump = (obj: Object) => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
export const staticMap = ([lng, lat]: [number, number]) =>
  `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${lat},${lng}/14?mapSize=800,150&pp=${lat},${lng};66&mapLayer=Basemap,Buildings&key=${process.env.MAP_KEY}&dpi=Large`;

// inserting an SVG
export const icon = (name: string) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
export const siteName = `Now That's Delicious!`;

export const menu = [
  { slug: '/stores', title: 'Stores', icon: 'store' },
  { slug: '/tags', title: 'Tags', icon: 'tag' },
  { slug: '/top', title: 'Top', icon: 'top' },
  { slug: '/add', title: 'Add', icon: 'add' },
  { slug: '/map', title: 'Map', icon: 'map' },
];
