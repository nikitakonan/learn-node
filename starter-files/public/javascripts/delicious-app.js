import '@babel/polyfill';

import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import makeMap from './modules/map';

window.GetMap = function GetMap() {
  autocomplete($('#address'), $('#lat'), $('#lng'));
  makeMap($('#map'));
};

typeAhead($('.search'));
